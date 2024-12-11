import { isValidEmail } from '../validation';
test('Проверка валидации почты', () => {
  expect(isValidEmail('sollevar@mail.ru')).toBe(true);
});
