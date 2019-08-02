// Environment Variables
require('dotenv').config();

// Server Dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const getUser = require('./middleware/getUser');
const checkBlacklist = require('./middleware/checkBlacklist');

// Helpers
const {
  connect,
  createBlacklist,
  createCache,
  getRolesWithPermissionNames,
  startServer,
} = require('./helpers');

// Express App
const app = express();

// Cache
const cache = createCache();

// Middleware
app.use(cookieParser(process.env.SECRET)); // sign cookies using env SECRET
app.use(getUser);
app.use(checkBlacklist(cache));

// CORS Setup
const corsConfig = {
  origin: 'http://localhost:3000',
  credentials: true,
};

async function initialize(uri) {
  // connect to DB
  connect(uri).then((db) => {
    Promise.all([getRolesWithPermissionNames(), createBlacklist()])
      .catch(err => console.error(err))
      .then(([roles, blacklist]) => {
        cache.set('roles', roles);
        cache.set('blacklist', blacklist);

        // start server
        startServer(app, {
          host: process.env.HOST,
          port: process.env.PORT,
          nodeEnv: process.env.NODE_ENV,
          db,
          cors: corsConfig,
          cache,
        });
      });
  });
}

initialize(process.env.DB_URI).catch(err => console.error(err));

// Exception Handling
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
  process.exit(0);
});
