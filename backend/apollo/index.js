const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const { AuthDirective } = require('./directives');

exports.createApolloServer = function createApolloServer(app, path, cors, db, cache) {
  const s = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives: {
      auth: AuthDirective,
    },
    context: ({ req, res }) => ({
      req,
      res,
      db,
      cache,
    }),
    playground: process.env.NODE_ENV === 'development',
  });

  s.applyMiddleware({ app, path, cors });

  return s;
};
