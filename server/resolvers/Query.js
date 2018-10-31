// utils
const { getUserId } = require('../utils');

const users = async (root, args, context) => {
  const userId = getUserId(context);

  return await context.prisma.users();
};

const todoes = async (root, args, context) => {
  const userId = getUserId(context);

  return await context.prisma.todoes();
};

module.exports = { users, todoes };
