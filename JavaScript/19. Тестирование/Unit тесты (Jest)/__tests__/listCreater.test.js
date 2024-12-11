import { createList } from '../listCreater';
test('Создание Cписка', () => {
  const expectList = '<ul><li>first</li><li>second</li></ul>';
  const el = createList(['first', 'second1']);
  expect(el).toBeInstanceOf(HTMLUListElement);
  expect(el.outerHTML).toBe(expectList);
});
