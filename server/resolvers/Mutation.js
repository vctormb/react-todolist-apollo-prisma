const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// AUTH

const signup = async (root, args, context) => {
  const password = await bcrypt.hash(args.password, 10);

  const user = await context.prisma.createUser({
    ...args,
    password,
  });

  return {
    token: jwt.sign({ userId: user.id }, 'MY_SECRET'),
    user,
  };
};

const login = async (root, { email, password }, context) => {
  const user = await context.prisma.user({ email });

  if (!user) throw new Error('Invalid email or password');

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) throw new Error('Invalid email or password');

  return {
    token: jwt.sign({ userId: user.id }, 'MY_SECRET'),
    user,
  };
};

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

const updateTodo = async (root, { todoId, ...rest }, context) => {
  const todo = await context.prisma.todo({ id: todoId });

  if (!todo) throw new Error('Not found');

  return await context.prisma.updateTodo({
    data: rest,
    where: { id: todoId },
  });
};

const deleteManyTodoes = async (root, { todoIds }, context) => {
  return await context.prisma.deleteManyTodoes({
    id_in: todoIds,
  });
};

module.exports = {
  signup,
  login,
  createUser,
  createTodo,
  updateTodo,
  deleteManyTodoes,
};
