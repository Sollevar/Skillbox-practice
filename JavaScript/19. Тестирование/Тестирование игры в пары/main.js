// Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.
// count - количество карточек (всегда четное)
function createNumbersArray(count) {
  let arrayOfPairedNumbers = [];
  for (let i = 1; i < count + 1; ++i) {
    let arrayElement = i;
    arrayOfPairedNumbers.push(arrayElement, arrayElement);
  }
  return arrayOfPairedNumbers;
}

// Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел
function shuffle(arr) {
  let i = arr.length;
  while (--i > 0) {
    let temp = Math.floor(Math.random() * (i + 1));
    [arr[temp], arr[i]] = [arr[i], arr[temp]];
  }
  return arr;
}

// Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.

function startGame(count) {
  const mainArray = createNumbersArray(count);
  const shuffleArray = shuffle(mainArray);

  let container = document.createElement('div');
  container.classList.add('container');
  container.style = `grid-template-columns: repeat(4, 1fr);`;
  document.body.append(container);
  createCard(shuffleArray);

  const timerWrapper = document.createElement('div');
  timerWrapper.classList.add('timer-wrap');

  const timer = document.createElement('div');
  timer.classList.add('timer');
  let time = 60;
  let interval = setInterval(gameTimer, 1000);

  function gameTimer() {
    if (time === 0) {
      timer.textContent = 0;
      clearInterval(interval);
      setTimeout(() => {
        alert('Вы проиграли');
        timerWrapper.remove();
        container.remove();
        ControllGame();
      }, 500);
    }
    timer.textContent = time;
    time -= 1;
  }

  timerWrapper.append(timer);
  document.body.append(timerWrapper);

  // нужно для проверки на цифры в карточке
  let firstCard = null;
  let secondCard = null;

  function createCard(cards) {
    for (const card of cards) {
      let cardWrapper = document.createElement('div');
      cardWrapper.classList.add('card');
      cardWrapper.textContent = card;
      container.append(cardWrapper);

      cardWrapper.addEventListener('click', () => {
        if (
          cardWrapper.classList.contains('card-active') ||
          cardWrapper.classList.contains('succes')
        ) {
          return;
        }

        if (firstCard !== null && secondCard !== null) {
          firstCard.classList.remove('card-active');
          secondCard.classList.remove('card-active');
          firstCard = null;
          secondCard = null;
        }

        cardWrapper.classList.add('card-active');

        if (firstCard === null) {
          firstCard = cardWrapper;
        } else {
          secondCard = cardWrapper;
        }

        if (firstCard !== null && secondCard !== null) {
          let firstCardNumber = firstCard.textContent;
          let secondCardNumber = secondCard.textContent;
          if (firstCardNumber === secondCardNumber) {
            firstCard.classList.add('succes');
            secondCard.classList.add('succes');
          }
        }

        if (cards.length === document.querySelectorAll('.succes').length) {
          setTimeout(() => {
            alert('Игра завершена, вы победили!');
            if (confirm('Хотите сыграть еще раз ?')) {
              timerWrapper.remove();
              container.remove();
              ControllGame();
            }
          }, 500);
        }
      });
    }
  }
}

function ControllGame() {
  const controllContainer = document.createElement('div');
  document.body.append(controllContainer);

  const h1 = document.createElement('h1');
  h1.textContent = 'Игра в пары';
  h1.classList.add('h1');
  controllContainer.append(h1);

  const horizontal = document.createElement('input');
  horizontal.type = 'number';
  horizontal.min = 2;
  horizontal.max = 10;
  horizontal.placeholder = 'Введите количество карточек по горизонтале';
  horizontal.classList.add('horizontal');
  controllContainer.append(horizontal);

  const vertical = document.createElement('input');
  vertical.type = 'number';
  vertical.min = 2;
  vertical.max = 10;
  vertical.placeholder = 'Введите количество карточек по вертикале';
  vertical.classList.add('vertical');
  controllContainer.append(vertical);

  const btnStart = document.createElement('button');
  btnStart.textContent = 'Начать игру';
  btnStart.classList.add('btn-start', 'btn-reset');
  controllContainer.append(btnStart);

  let horizontalNumber = 2;
  let verticalNumber = 4;

  horizontal.addEventListener('input', () => {
    horizontalNumber = horizontal.value;
    if (
      horizontalNumber < 2 ||
      horizontalNumber > 10 ||
      horizontalNumber % 2 === 1
    ) {
      horizontalNumber = 2;
    }
  });

  vertical.addEventListener('input', () => {
    verticalNumber = vertical.value;
    if (verticalNumber < 2 || verticalNumber > 10 || verticalNumber % 2 === 1) {
      verticalNumber = 4;
    }
  });

  btnStart.addEventListener('click', () => {
    controllContainer.remove();
    startGame(horizontalNumber * verticalNumber, horizontalNumber);
  });
}

ControllGame();
