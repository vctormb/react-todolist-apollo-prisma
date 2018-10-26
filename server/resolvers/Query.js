const users = async (root, args, context) => {
  return await context.prisma.users();
};

const todoes = async (root, args, context) => {
  return await context.prisma.todoes();
};

module.exports = { users, todoes };
