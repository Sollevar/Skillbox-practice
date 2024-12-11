import { cardNumberValidation } from '../src/cardNumber-validation.js';
import { validityMap } from '../src/updateButtonState.js';
import valid from 'card-validator';
jest.mock('card-validator'); // имитация библиотеки
describe('Валидация номера карты', () => {
  let numberInput, logo, sendButton;

  beforeEach(() => {
    // Создаём виртуальные DOM-элементы
    numberInput = document.createElement('input');
    logo = document.createElement('div');
    sendButton = document.createElement('button');
    sendButton.disabled = true;
    validityMap.clear();
  });

  test('Проверка неправильного введенного номера', () => {
    valid.number.mockReturnValue({ isValid: false });

    cardNumberValidation(numberInput, logo, sendButton);

    numberInput.value = '1111 1111 1111 1111';
    numberInput.dispatchEvent(new Event('blur')); // имитация события blur

    expect(numberInput.classList.contains('not-valid')).toBe(true);
    expect(logo.textContent).toBe('Type');
    expect(validityMap.get('number')).toBe(false);
  });

  test('Проверка неправильного введенного номера (кириллица)', () => {
    valid.number.mockReturnValue({ isValid: false });

    cardNumberValidation(numberInput, logo, sendButton);

    numberInput.value = '1111 11ы1 1111 фб';
    numberInput.dispatchEvent(new Event('blur')); // Симуляция события blur

    expect(numberInput.classList.contains('not-valid')).toBe(true);
    expect(logo.textContent).toBe('Type');
    expect(validityMap.get('number')).toBe(false);
    expect(sendButton.disabled).toBe(true);
  });

  test('Проверка неправильного введенного номера (латиница)', () => {
    valid.number.mockReturnValue({ isValid: false });

    cardNumberValidation(numberInput, logo, sendButton);

    numberInput.value = '1111 11a1 1b11 1111';
    numberInput.dispatchEvent(new Event('blur')); // Симуляция события blur

    expect(numberInput.classList.contains('not-valid')).toBe(true);
    expect(logo.textContent).toBe('Type');
    expect(validityMap.get('number')).toBe(false);
    expect(sendButton.disabled).toBe(true);
  });

  test('Проверка неправильного введенного номера (знаки препинания)', () => {
    valid.number.mockReturnValue({ isValid: false });

    cardNumberValidation(numberInput, logo, sendButton);

    numberInput.value = '111! 111, 11.1 11?1';
    numberInput.dispatchEvent(new Event('blur')); // Симуляция события blur

    expect(numberInput.classList.contains('not-valid')).toBe(true);
    expect(logo.textContent).toBe('Type');
    expect(validityMap.get('number')).toBe(false);
    expect(sendButton.disabled).toBe(true);
  });

  test('Проверка неправильного введенного номера (25 цифр)', () => {
    valid.number.mockReturnValue({ isValid: false });

    cardNumberValidation(numberInput, logo, sendButton);

    numberInput.value = '1111 1111 1111 1111 1111 1111 1';
    numberInput.dispatchEvent(new Event('blur')); // Симуляция события blur

    expect(numberInput.classList.contains('not-valid')).toBe(true);
    expect(logo.textContent).toBe('Type');
    expect(validityMap.get('number')).toBe(false);
    expect(sendButton.disabled).toBe(true);
  });

  test('Проверка неправильного введенного номера (недостаточное количество цифр)', () => {
    valid.number.mockReturnValue({ isValid: false });

    cardNumberValidation(numberInput, logo, sendButton);

    numberInput.value = '1111 1111 1111 111';
    numberInput.dispatchEvent(new Event('blur')); // Симуляция события blur

    expect(numberInput.classList.contains('not-valid')).toBe(true);
    expect(logo.textContent).toBe('Type');
    expect(validityMap.get('number')).toBe(false);
    expect(sendButton.disabled).toBe(true);
  });

  test('Проверка правильного введенного номера', () => {
    valid.number.mockReturnValue({ isValid: true, card: { niceType: 'Visa' } });

    cardNumberValidation(numberInput, logo, sendButton);

    numberInput.value = '4620 1741 1067 2867'; // Валидный номер
    numberInput.dispatchEvent(new Event('blur'));

    expect(numberInput.classList.contains('not-valid')).toBe(false);
    expect(logo.textContent).toBe('Visa');
    expect(validityMap.get('number')).toBe(true);
  });
});
