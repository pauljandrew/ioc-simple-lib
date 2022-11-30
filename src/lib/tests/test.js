import SimpleIoC from '../index';

test('Runs without crashing', () => {
  new SimpleIoC();
});

test('Can\'t register duplicate name', () => {
  const sioc = new SimpleIoC();

  expect(sioc.registerClass('Test')).toBe(true);
  expect(sioc.registerClass('Test')).toBe(false);
});

test('Can\'t remove unregistered name', () => {
  const sioc = new SimpleIoC();

  expect(sioc.remove('Test')).toBe(false);
});