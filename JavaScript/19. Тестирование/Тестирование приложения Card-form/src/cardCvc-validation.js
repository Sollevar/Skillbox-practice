import valid from 'card-validator';
import { updateButtonState, validityMap } from './updateButtonState.js';
export function cardCvcValidation(cvc, sendButton) {
  cvc.addEventListener('blur', () => {
    const value = valid.cvv(cvc.value);
    if (!value.isValid) {
      cvc.classList.add('not-valid');
      validityMap.set('cvc', false);
    } else {
      cvc.classList.remove('not-valid');
      validityMap.set('cvc', true);
    }
    updateButtonState(sendButton);
  });

  cvc.addEventListener('focus', () => {
    cvc.classList.remove('not-valid');
  });
}
