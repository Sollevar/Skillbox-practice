import { el, setChildren } from 'redom';
import './styles/style.css';
import mainImage from './assets/image.jpg';
export function createCardForm() {
  const circlesWrapper = el('div.circles');
  const circleOne = el('div.circle circle-1');
  const circleSecond = el('div.circle circle-2');
  const cardWrapper = el('div.card-group');
  const cardForm = el('form.card');
  const cvcSpan = el('span', 'CVC:');
  const cvcLabel = el('label.cvc');
  const cvcInput = el('input', { type: 'text' });
  const logo = el('div.logo', 'Type');
  const imgWrapper = el('div.chip');
  const img = el('img');
  const cardNumberInput = el('input.number', {
    type: 'text',
  });
  cardNumberInput.placeholder = 'Enter card number';
  const cardEmailInput = el('input.email', {
    type: 'email',
  });
  cardEmailInput.placeholder = 'Enter email';
  const cardDateInput = el('input.to', {
    type: 'text',
  });
  cvcInput.placeholder = 'enter cvc';
  const sendButton = el('button.btn-send', 'Pay');

  img.src = 'https://raw.githubusercontent.com/dasShounak/freeUseImages/main/chip.png';
  img.alt = 'chip';
  sendButton.style.backgroundImage = `url(${mainImage})`;
  sendButton.disabled = true;
  setChildren(cvcLabel, cvcSpan, cvcInput);
  setChildren(imgWrapper, img);
  setChildren(cardForm, cvcLabel, logo, imgWrapper, cardNumberInput, cardEmailInput, cardDateInput);
  setChildren(cardWrapper, cardForm, sendButton);
  setChildren(circlesWrapper, circleOne, circleSecond);
  setChildren(document.body, circlesWrapper, cardWrapper);
  return {
    cardNumberInput,
    cvcInput,
    cardDateInput,
    cardEmailInput,
    cardForm,
    sendButton,
    logo,
  };
}
