const posts = async (root, args, context) => {
  return await context.prisma
    .user({
      id: root.id,
    })
    .posts();
};

module.exports = {
  posts,
};
