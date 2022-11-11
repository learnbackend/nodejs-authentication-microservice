const bcrypt = require('bcrypt');
const signupService = require('../../services/signup');

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));

afterEach(() => jest.clearAllMocks());

const data = {
  email: 'user@test.com',
  password: 'password',
};
const repo = {
  create: jest.fn(),
};
const hash = 'hash';

test('it should hash the password 10 rounds', async () => {
  await signupService(data, repo.create);

  expect(bcrypt.hash).toHaveBeenCalledWith(data.password, 10);
});

test('it should call the repository with the email address and the hash', async () => {
  bcrypt.hash.mockImplementationOnce(() => hash);

  await signupService(data, repo.create);

  expect(repo.create).toHaveBeenCalledWith({
    email: data.email,
    hash,
  });
});
