import express from 'express';
const pathToSwaggerUi = require('swagger-ui-dist').absolutePath()
import consign from 'consign';
import cors from 'cors';

module.exports = () => {
  const app = express();

  app.use(express.static(pathToSwaggerUi))

  app.use(express.json());

  app.use(cors());

  consign({ cwd: 'src' })
    .then('validations')
    .then('controllers')
    .then('routers')
    .then('models')
    .into(app);

  return app;
};
