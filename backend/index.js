const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const sequelize = require('./db/db');
const urlencodedParser = express.urlencoded({ extended: false });
const router = require('./router')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/index.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
require("dotenv").config();


app.use('', router);

async function start() {
  await sequelize.authenticate();
  await sequelize.sync();
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

start();
