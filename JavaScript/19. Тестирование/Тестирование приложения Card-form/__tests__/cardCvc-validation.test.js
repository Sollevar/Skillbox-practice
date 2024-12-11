import { cardCvcValidation } from '../src/cardCvc-validation.js';
import { validityMap } from '../src/updateButtonState.js';
import valid from 'card-validator';
jest.mock('card-validator'); // имитация библиотеки
describe('Валидация cvc карты', () => {
  let cvcInput, sendButton;

  beforeEach(() => {
    // Создаём виртуальные DOM-элементы
    cvcInput = document.createElement('input');
    sendButton = document.createElement('button');
    validityMap.clear();
  });

  test('Проверка правильно введенного cvc', () => {
    valid.cvv.mockReturnValue({ isValid: true });

    cardCvcValidation(cvcInput, sendButton);

    cvcInput.value = '111';
    cvcInput.dispatchEvent(new Event('blur')); // имитация события blur

    expect(cvcInput.classList.contains('not-valid')).toBe(false);
    expect(validityMap.get('cvc')).toBe(true);
  });

  test('Проверка неправильно введенного cvc (1 символ)', () => {
    valid.cvv.mockReturnValue({ isValid: false });

    cardCvcValidation(cvcInput, sendButton);

    cvcInput.value = '1';
    cvcInput.dispatchEvent(new Event('blur')); // имитация события blur

    expect(cvcInput.classList.contains('not-valid')).toBe(true);
    expect(validityMap.get('cvc')).toBe(false);
  });

  test('Проверка неправильно введенного cvc (2 символа)', () => {
    valid.cvv.mockReturnValue({ isValid: false });

    cardCvcValidation(cvcInput, sendButton);

    cvcInput.value = '12';
    cvcInput.dispatchEvent(new Event('blur')); // имитация события blur

    expect(cvcInput.classList.contains('not-valid')).toBe(true);
    expect(validityMap.get('cvc')).toBe(false);
  });

  test('Проверка неправильно введенного cvc (4 символа)', () => {
    valid.cvv.mockReturnValue({ isValid: false });

    cardCvcValidation(cvcInput, sendButton);

    cvcInput.value = '1234';
    cvcInput.dispatchEvent(new Event('blur')); // имитация события blur

    expect(cvcInput.classList.contains('not-valid')).toBe(true);
    expect(validityMap.get('cvc')).toBe(false);
  });

  test('Проверка неправильно введенного cvc (латиница)', () => {
    valid.cvv.mockReturnValue({ isValid: false });

    cardCvcValidation(cvcInput, sendButton);

    cvcInput.value = '1ab';
    cvcInput.dispatchEvent(new Event('blur')); // имитация события blur

    expect(cvcInput.classList.contains('not-valid')).toBe(true);
    expect(validityMap.get('cvc')).toBe(false);
  });

  test('Проверка неправильно введенного cvc (кириллица)', () => {
    valid.cvv.mockReturnValue({ isValid: false });

    cardCvcValidation(cvcInput, sendButton);

    cvcInput.value = 'ва4';
    cvcInput.dispatchEvent(new Event('blur')); // имитация события blur

    expect(cvcInput.classList.contains('not-valid')).toBe(true);
    expect(validityMap.get('cvc')).toBe(false);
  });

  test('Проверка неправильно введенного cvc (знаки препинания)', () => {
    valid.cvv.mockReturnValue({ isValid: false });

    cardCvcValidation(cvcInput, sendButton);

    cvcInput.value = '1!?';
    cvcInput.dispatchEvent(new Event('blur')); // имитация события blur

    expect(cvcInput.classList.contains('not-valid')).toBe(true);
    expect(validityMap.get('cvc')).toBe(false);
  });
});
