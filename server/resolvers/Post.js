const author = async (root, args, context) => {
  return await context.prisma
    .post({
      id: root.id,
    })
    .author();
};

module.exports = {
  author,
};
