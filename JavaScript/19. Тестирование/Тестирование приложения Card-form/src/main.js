import 'babel-polyfill';
import { createCardForm } from './create-dom.js';
import { validator } from './validation.js';
const { cardNumberInput, cvcInput, cardEmailInput, cardDateInput, cardForm, sendButton, logo } = createCardForm();
validator(cardNumberInput, cvcInput, cardEmailInput, cardDateInput, cardForm, sendButton, logo);
