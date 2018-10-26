const author = async (root, args, context) => {
  return await context.prisma
    .todo({
      id: root.id,
    })
    .author();
};

module.exports = {
  author,
};
