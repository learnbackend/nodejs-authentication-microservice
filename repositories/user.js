module.exports = (model) => ({
  read: (email) => model.findOne({
    attributes: ['id', 'hash'],
    where: { email },
  }),
  create: ({ email, hash }) => model.create({
    email,
    hash,
  }),
});
