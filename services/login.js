const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CustomError = require('../utils/custom-error');

module.exports = async (data, secret, getUser) => {
  const user = await getUser(data.email);
  if (!user) {
    throw new CustomError('USER_NOT_FOUND');
  }

  const isMatching = await bcrypt.compare(data.password, user.hash);
  if (!isMatching) {
    throw new CustomError('INCORRECT_PASSWORD');
  }

  const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });
  return token;
};
