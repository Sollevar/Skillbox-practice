class Card {
    constructor(container, cardNumber) {
        this.container = container;
        this.cardNumber = cardNumber;
        this.cardElement = this.createElement();
        this._isOpen = false;
        this._isSuccess = false;
        this.initEvents();
    }

    createElement() {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.textContent = this._isOpen ? this.cardNumber : '';
        this.container.append(cardElement);
        return cardElement;
    }

    initEvents() {
        this.cardElement.addEventListener('click', () => {
            if (!this._isOpen && !this._isSuccess) {
                this.open();
                onCardClick(this);
            }
        });
    }

    open() {
        this._isOpen = true;
        this.cardElement.classList.add('card-active');
        this.cardElement.textContent = this.cardNumber;
    }

    close() {
        this._isOpen = false;
        this.cardElement.classList.remove('card-active');
        this.cardElement.textContent = '';
    }

    markSuccess() {
        this._isSuccess = true;
        this.cardElement.classList.add('succes');
    }

    get isOpen() {
        return this._isOpen;
    }

    get isSuccess() {
        return this._isSuccess;
    }
}

let firstCard = null;
let secondCard = null;
let timer;
let timerWrapper;

function createNumbersArray(count) {
    const arrayOfPairedNumbers = [];
    for (let i = 1; i <= count; i++) {
        arrayOfPairedNumbers.push(i, i);
    }
    return arrayOfPairedNumbers;
}

function shuffle(arr) {
    let i = arr.length;
    while (--i > 0) {
        const temp = Math.floor(Math.random() * (i + 1));
        [arr[temp], arr[i]] = [arr[i], arr[temp]];
    }
    return arr;
}

function onCardClick(card) {
    if (firstCard === null) {
        firstCard = card;
    } else {
        secondCard = card;

        if (firstCard.cardNumber === secondCard.cardNumber) {
            firstCard.markSuccess();
            secondCard.markSuccess();
            resetSelectedCards();
            checkGameEnd();
        } else {
            setTimeout(() => {
                firstCard.close();
                secondCard.close();
                resetSelectedCards();
            }, 1000);
        }
    }
}

function resetSelectedCards() {
    firstCard = null;
    secondCard = null;
}

function checkGameEnd() {
    const allCards = document.querySelectorAll('.card');
    const successCards = document.querySelectorAll('.succes');
    if (allCards.length === successCards.length) {
        clearInterval(timer);
        setTimeout(() => {
            alert("Игра завершена, вы победили!");
            if (confirm("Хотите сыграть еще раз?")) {
                ControllGame();
            }
        }, 500);
    }
}

function startGame(count, grid) {
    const numbers = shuffle(createNumbersArray(count));
    const container = document.createElement("div");
    container.classList.add("container");
    container.style.gridTemplateColumns = `repeat(${grid}, 1fr)`;
    document.body.append(container);

    numbers.forEach(number => new Card(container, number));

    createTimer(container);
}

function createTimer(container) {
    timerWrapper = document.createElement('div');
    timerWrapper.classList.add('timer-wrap');

    const timerDisplay = document.createElement('div');
    timerDisplay.classList.add('timer');
    let time = 60;

    timer = setInterval(() => {
        if (time <= 0) {
            clearInterval(timer);
            alert('Время вышло! Вы проиграли.');
            resetGame(container);
        } else {
            timerDisplay.textContent = time;
            time--;
        }
    }, 1000);

    timerWrapper.append(timerDisplay);
    document.body.append(timerWrapper);
}

function resetGame(container) {
    timerWrapper.remove();
    container.remove();
    ControllGame();
}

function ControllGame() {
    document.body.innerHTML = '';

    const controllContainer = document.createElement('div');
    document.body.append(controllContainer);

    const h1 = document.createElement("h1");
    h1.textContent = "Игра в пары";
    h1.classList.add("h1");
    controllContainer.append(h1);

    const horizontalInput = document.createElement("input");
    horizontalInput.type = "number";
    horizontalInput.min = 2;
    horizontalInput.max = 10;
    horizontalInput.placeholder = "Введите количество карточек по горизонтале";
    horizontalInput.classList.add("horizontal");
    controllContainer.append(horizontalInput);

    const verticalInput = document.createElement("input");
    verticalInput.type = "number";
    verticalInput.min = 2;
    verticalInput.max = 10;
    verticalInput.placeholder = "Введите количество карточек по вертикале";
    verticalInput.classList.add("vertical");
    controllContainer.append(verticalInput);

    const btnStart = document.createElement("button");
    btnStart.textContent = "Начать игру";
    btnStart.classList.add("btn-start", "btn-reset");
    controllContainer.append(btnStart);

    btnStart.addEventListener('click', () => {
        const horizontal = parseInt(horizontalInput.value) || 4;
        const vertical = parseInt(verticalInput.value) || 4;
        const cardCount = horizontal * vertical;

        if (cardCount % 2 !== 0 || cardCount < 4 || cardCount > 100) {
            alert("Введите четное количество карточек от 4 до 100.");
            return;
        }

        controllContainer.remove();
        startGame(cardCount, horizontal);
    });
}

ControllGame();
