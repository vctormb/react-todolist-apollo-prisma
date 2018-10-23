const createDraft = async (root, args, context) => {
  return await context.prisma.createPost({
    title: args.title,
    author: {
      connect: { id: args.userId },
    },
  });
};

const publish = async (root, args, context) => {
  return await context.prisma.updatePost({
    where: { id: args.postId },
    data: { published: true },
  });
};

const createUser = async (root, args, context) => {
  return await context.prisma.createUser({
    name: args.name,
    email: args.email,
  });
};

module.exports = {
  createDraft,
  publish,
  createUser,
};
