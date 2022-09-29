'use strict';

require('dotenv').config();
const app = require('./src/server');
const { db } = require('./src/models');

db.sync()
  .then(() => {
    app.start(process.env.PORT || 3002);
  });
