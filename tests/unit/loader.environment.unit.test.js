const Env = require('../../loaders/environment');

test('it should return an object when loading the test config', () => {
  const expected = {
    server: {
      port: 3000,
    },
    jwt: {
      secret: 'secret',
    },
    database: {
      name: 'foo',
      user: 'bar',
      password: 'baz',
      host: 'localhost',
      port: 3306,
      dialect: 'mysql',
      logging: true,
      sync: true,
    },
  };

  expect(Env()).toEqual(expected);
});

test('it should throw an error when loading a missing config', () => {
  process.env.NODE_ENV = 'foo';

  expect(() => Env()).toThrow();

  process.env.NODE_ENV = 'test';
});
