const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./prisma/generated/prisma');

const resolvers = require('./resolvers');

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: {
    prisma,
  },
});

server.start(() => console.log('Server is running on http://localhost:4000'));
