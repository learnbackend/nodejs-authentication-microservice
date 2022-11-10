const UserModel = require('./user');

module.exports = async (db, env) => {
  const user = await UserModel(db, env);

  return { user };
};
