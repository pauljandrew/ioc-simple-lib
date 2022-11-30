import SimpleIoC from '../index';

test('Runs without crashing', () => {
  new SimpleIoC();
});

test('Can\'t register duplicate name', () => {
  const sioc = new SimpleIoC();

  expect(sioc.register('Test')).toBe(true);
  expect(sioc.register('Test')).toBe(false);
});

test('Can\'t remove unregistered name', () => {
  const sioc = new SimpleIoC();

  expect(sioc.remove('Test')).toBe(false);
});

// test('Can resolve classes to instances', () => {
//   const sioc = new SimpleIoC();

//   expect(sioc.remove('Test')).toBe(false);
// });
