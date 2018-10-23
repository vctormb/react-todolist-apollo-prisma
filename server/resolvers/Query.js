const publishedPosts = async (root, args, context) => {
  return await context.prisma.posts({ where: { published: true } });
};

const post = async (root, args, context) => {
  return await context.prisma.post({ id: args.postId });
};

const postsByUser = async (root, args, context) => {
  return await context.prisma
    .user({
      id: args.userId,
    })
    .posts();
};

module.exports = {
  publishedPosts,
  post,
  postsByUser,
};
