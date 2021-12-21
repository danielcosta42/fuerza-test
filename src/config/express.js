import express from 'express';
const pathToSwaggerUi = require('swagger-ui-dist').absolutePath()
import consign from 'consign';
import cors from 'cors';

module.exports = () => {
  const app = express();

  app.use(function(req, res, next){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });
  
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
