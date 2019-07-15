// Environment Variables
require('dotenv').config();

// Server Dependencies
const express = require('express');
const cookieParser = require('cookie-parser');

// Helpers
const { connect, startServer } = require('./helpers');

// Express App
const app = express();

// Middleware
app.use(cookieParser(process.env.SECRET)); // sign cookies using env SECRET

// CORS Setup
const corsConfig = {
  origin: 'localhost:3000',
  credentials: true,
};

// Connect to DB and start server
connect(process.env.DB_URI).then((database) => {
  startServer(app, {
    host: process.env.HOST,
    port: process.env.PORT,
    nodeEnv: process.env.NODE_ENV,
    db: database,
    cors: corsConfig,
  });
});

// Exception Handling
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
  process.exit(0);
});
