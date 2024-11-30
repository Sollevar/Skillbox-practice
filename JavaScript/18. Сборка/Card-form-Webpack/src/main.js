import 'babel-polyfill';
import { el, setChildren } from "redom";
import Inputmask from "inputmask";
import valid from 'card-validator';
import './styles/style.css';
import mainImage from './assets/image.jpg';


const circlesWrapper = el('div.circles');
const circleOne = el('div.circle circle-1');
const circleSecond = el('div.circle circle-2');
const cardWrapper = el('div.card-group');
const cardForm = el('form.card');
const cvcSpan = el('span', 'CVC:')
const cvcLabel = el('label.cvc');
const cvcInput = el('input', { type: "text" })
const logo = el('div.logo', 'Type');
const imgWrapper = el('div.chip');
const img = el('img');
const cardNumberInput = el('input.number', {
    type: "text",
});
cardNumberInput.placeholder = 'Enter card number';
const cardEmailInput = el('input.email', {
    type: "email",
});
cardEmailInput.placeholder = 'Enter email'
const cardDateInput = el('input.to', {
    type: "text",
});
const sendButton = el('button.btn-send', 'Оплатить');

img.src = "https://raw.githubusercontent.com/dasShounak/freeUseImages/main/chip.png";
img.alt = "chip";
sendButton.style.backgroundImage = `url(${mainImage})`;
sendButton.disabled = true;


const numberMask = new Inputmask('9999 9999 9999 9999');
const cvcMask = new Inputmask('999');
const dateMask = new Inputmask('99/99');
numberMask.mask(cardNumberInput);
cvcMask.mask(cvcInput);
dateMask.mask(cardDateInput);

setChildren(cvcLabel, cvcSpan, cvcInput);
setChildren(imgWrapper, img)
setChildren(cardForm, cvcLabel, logo, imgWrapper, cardNumberInput, cardEmailInput, cardDateInput)
setChildren(cardWrapper, cardForm, sendButton);
setChildren(circlesWrapper, circleOne, circleSecond);
setChildren(document.body, circlesWrapper, cardWrapper);

const validityMap = new Map();

function updateButtonState() {
    if (validityMap.size === 4) {
        const allValid = Array.from(validityMap.values()).every((valid) => valid);
        sendButton.disabled = !allValid;
    }
    return
}

sendButton.addEventListener('click', () => {
    alert('Оплата прошла успешно');
    for (const input of cardForm.elements) {
        input.value = '';
    }
    validityMap.clear();
})

cardNumberInput.addEventListener('blur', () => {
    const value = valid.number(cardNumberInput.value.replace(/\s+/g, ''));
    if (!value.isValid) {
        cardNumberInput.classList.add('not-valid');
        logo.textContent = 'Type';
        validityMap.set('cardNumberInput', false);
    } else {
        cardNumberInput.classList.remove('not-valid');
        logo.textContent = value.card.niceType;
        validityMap.set('cardNumberInput', true);
    }
    updateButtonState();
});

cardNumberInput.addEventListener('focus', () => {
    cardNumberInput.classList.remove('not-valid');
});

cardDateInput.addEventListener('blur', () => {
    const value = valid.expirationDate(cardDateInput.value, 4);
    if (!value.isValid) {
        cardDateInput.classList.add('not-valid');
        validityMap.set('cardDateInput', false);
    } else {
        cardDateInput.classList.remove('not-valid');
        validityMap.set('cardDateInput', true);
    }
    updateButtonState();
})

cardDateInput.addEventListener('focus', () => {
    cardDateInput.classList.remove('not-valid');
});

cvcInput.addEventListener('blur', () => {
    const value = valid.cvv(cvcInput.value);
    if (!value.isValid) {
        cvcInput.classList.add('not-valid');
        validityMap.set('cvcInput', false);
    } else {
        cvcInput.classList.remove('not-valid');
        validityMap.set('cvcInput', true);
    }
    updateButtonState();
})

cvcInput.addEventListener('focus', () => {
    cvcInput.classList.remove('not-valid');
});

cardEmailInput.addEventListener('blur', () => {
    const value = cardEmailInput.value.trim();
    if (!value.includes('@') || !value.includes('.')) {
        cardEmailInput.classList.add('not-valid');
        validityMap.set('cardEmailInput', false);
    } else {
        cardEmailInput.classList.remove('not-valid');
        validityMap.set('cardEmailInput', true);
    }
    updateButtonState();
})

cardEmailInput.addEventListener('focus', () => {
    cardEmailInput.classList.remove('not-valid');
});
// <
// link rel = "preconnect"
// href = "https://fonts.gstatic.com" >
//     <
//     link href = "https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400&display=swap"
// rel = "stylesheet" >
//     <
//     link href = "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400&display=swap"
// rel = "stylesheet" >