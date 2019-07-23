const mongoose = require('mongoose');
const NodeCache = require('node-cache');
const { createApolloServer } = require('../apollo');
const { Role, Permission } = require('../models');

function startServer(app, {
  apiURL = '/graphql',
  host,
  port,
  nodeEnv,
  cors,
  db,
  cache,
}) {
  const server = createApolloServer(app, apiURL, cors, db, cache);

  app.listen(port, () => {
    console.log(`${nodeEnv.toUpperCase()} :: Apollo-Server running on ${host}:${port}${server.graphqlPath}`);
  });
}

async function connect(uri) {
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
}

function createCache(ttl = 0) {
  return new NodeCache({ stdTTL: ttl, checkperiod: ttl * 0.2, useClones: false });
}

async function getRolesWithPermissionNames() {
  async function getNames(ids) {
    const permissions = await Promise.all(ids.map(async id => Permission.findById(id).then(doc => doc)));

    return permissions.map(permission => permission.name);
  }

  async function addNames() {
    const result = await Role.find({}).then(async (docs) => {
      const newRoles = await Promise.all(docs.map(async (role) => {
        const permissionNames = await getNames(role.permissions);

        return {
          id: role.id,
          name: role.name,
          permissions: permissionNames,
        };
      }));
      return newRoles;
    });

    const obj = {};

    result.forEach((role) => {
      obj[`${role.name}`] = role;
    });

    return obj;
  }

  return addNames();
}

module.exports = {
  connect,
  createCache,
  getRolesWithPermissionNames,
  startServer,
};
