import { createCardForm } from '../src/create-dom';

test('Создание формы банковской карты', () => {
  createCardForm();
  expect(document.body).toMatchSnapshot();
});
