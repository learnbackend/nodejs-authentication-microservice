const bcrypt = require('bcrypt');

module.exports = async (data, createUser) => {
  const { email, password } = data;
  const hash = await bcrypt.hash(password, 10);
  await createUser({ email, hash });
};
