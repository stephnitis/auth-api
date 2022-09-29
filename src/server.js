'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const v1Routes = require('./routes/v1');

// Esoteric Resources
const errorHandler = require('./error-handlers/500');
const notFound = require('./error-handlers/404');
const authRoutes = require('./auth/routes');

// Prepare the express app
const app = express();
app.use(express.json());

// App Level MW
app.use(cors());
app.use(morgan('dev'));
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', v1Routes);
// Routes
app.use(authRoutes);

// Catchalls
app.use(notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (PORT) => {
    app.listen(PORT, () => {
      console.log(`Server Up on ${PORT}`);
    });
  },
};
