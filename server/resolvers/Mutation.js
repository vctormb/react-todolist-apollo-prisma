// USER

const createUser = async (root, args, context) => {
  return await context.prisma.createUser({
    ...args,
  });
};

// TODO
const createTodo = async (root, { userId, ...rest }, context) => {
  return await context.prisma.createTodo({
    ...rest,
    author: { connect: { id: userId } },
  });
};

module.exports = {
  createUser,
  createTodo,
};
