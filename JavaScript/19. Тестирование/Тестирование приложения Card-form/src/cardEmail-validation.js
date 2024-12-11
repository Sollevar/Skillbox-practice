import { updateButtonState, validityMap } from './updateButtonState.js';
export function cardEmailValidation(email, sendButton) {
  email.addEventListener('blur', () => {
    const value = email.value.trim();
    if (!value.includes('@') || !value.includes('.')) {
      email.classList.add('not-valid');
      validityMap.set('email', false);
    } else {
      email.classList.remove('not-valid');
      validityMap.set('email', true);
    }
    updateButtonState(sendButton);
  });

  email.addEventListener('focus', () => {
    email.classList.remove('not-valid');
  });
}
