import valid from 'card-validator';
import { updateButtonState, validityMap } from './updateButtonState.js';
export function cardDateValidation(date, sendButton) {
  date.addEventListener('blur', () => {
    const value = valid.expirationDate(date.value, 4);
    if (!value.isValid) {
      date.classList.add('not-valid');
      validityMap.set('date', false);
    } else {
      date.classList.remove('not-valid');
      validityMap.set('date', true);
    }
    updateButtonState(sendButton);
  });

  date.addEventListener('focus', () => {
    date.classList.remove('not-valid');
  });
}
