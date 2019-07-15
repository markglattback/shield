const mongoose = require('mongoose');
const { createApolloServer } = require('../apollo');

exports.startServer = function startServer(app, {
  apiURL = '/graphql',
  host,
  port,
  nodeEnv,
  cors,
  db,
}) {
  const server = createApolloServer(app, apiURL, cors, db);

  app.listen(port, () => {
    console.log(`${nodeEnv.toUpperCase()} :: Apollo-Server running on ${host}:${port}${server.graphqlPath}`);
  });
};


const connect = async uri => mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

exports.connect = connect;
