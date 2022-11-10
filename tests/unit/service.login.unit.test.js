const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const loginService = require('../../services/login');
const CustomError = require('../../utils/custom-error');

jest.mock('bcrypt', () => ({
  compare: jest.fn(() => true)
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn()
}));

afterEach(() => jest.clearAllMocks());

const data = {
  email: 'user@test.com',
  password: 'password'
};
const user = {
  id: 1,
  email: 'user@test.com',
  hash: 'hash'
};
const secret = 'hashstring';
const repo = {
  read: jest.fn(() => user)
};

test('it should call the repository with the email address', async () => {
  await loginService(data, secret, repo.read);

  expect(repo.read).toHaveBeenCalledWith(data.email);
});

test('it should compare the password and the hash', async () => {
  await loginService(data, secret, repo.read);

  expect(bcrypt.compare).toHaveBeenCalledWith(
    data.password,
    user.hash,
  );
});

test('it should sign the token', async () => {
  await loginService(data, secret, repo.read);

  expect(jwt.sign).toHaveBeenCalledWith(
    { id: user.id },
    secret,
    { expiresIn: '1h' }
  );
});

test('it should throw an error because user does not exist', async () => {
  repo.read.mockReturnValueOnce(null);
  try {
    await loginService(data, secret, repo.read);
  } catch(error) {
    expect(error).toEqual(new CustomError);
    expect(error.code).toBe('USER_NOT_FOUND');
  }
});

test('it should throw an error because password does not match', async () => {
  bcrypt.compare.mockReturnValueOnce(false);
  try {
    await loginService(data, secret, repo.read);
  } catch(error) {
    expect(error).toEqual(new CustomError);
    expect(error.code).toBe('INCORRECT_PASSWORD');
  }
});
