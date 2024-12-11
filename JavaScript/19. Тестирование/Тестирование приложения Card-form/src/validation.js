import Inputmask from '../node_modules/inputmask/dist/inputmask.es6.js';
import { cardNumberValidation } from './cardNumber-validation.js';
import { cardDateValidation } from './cardDate-validation.js';
import { cardCvcValidation } from './cardCvc-validation.js';
import { cardEmailValidation } from './cardEmail-validation.js';
import { updateButtonState, validityMap } from './updateButtonState.js';

export function validator(cardNumber, cardCvc, cardEmail, cardDate, cardForm, sendButton, logo) {
  const numberMask = new Inputmask('9999 9999 9999 9999');
  const cvcMask = new Inputmask('999');
  const dateMask = new Inputmask('99/99');
  numberMask.mask(cardNumber);
  cvcMask.mask(cardCvc);
  dateMask.mask(cardDate);

  cardNumberValidation(cardNumber, logo, sendButton);
  cardDateValidation(cardDate, sendButton);
  cardCvcValidation(cardCvc, sendButton);
  cardEmailValidation(cardEmail, sendButton);

  sendButton.addEventListener('click', () => {
    alert('Оплата прошла успешно');
    for (const input of cardForm.elements) {
      input.value = '';
    }
    validityMap.clear();
    updateButtonState(sendButton);
  });
}
