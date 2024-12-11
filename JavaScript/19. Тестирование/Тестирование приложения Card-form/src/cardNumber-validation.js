import valid from 'card-validator';
import { updateButtonState, validityMap } from './updateButtonState.js';
export function cardNumberValidation(number, logo, sendButton) {
  number.addEventListener('blur', () => {
    const value = valid.number(number.value.replace(/\s+/g, ''));
    if (!value.isValid) {
      number.classList.add('not-valid');
      logo.textContent = 'Type';
      validityMap.set('number', false);
    } else {
      number.classList.remove('not-valid');
      logo.textContent = value.card.niceType;
      validityMap.set('number', true);
    }
    updateButtonState(sendButton);
  });

  number.addEventListener('focus', () => {
    number.classList.remove('not-valid');
  });
}
