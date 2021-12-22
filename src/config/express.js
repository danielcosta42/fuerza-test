import express from 'express';
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
  
  const db = require("../models");
  db.mongoose
    .connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Connected to the database!");
    })
    .catch(err => {
      console.log("Cannot connect to the database!", err);
      process.exit();
    });

  app.use(express.json());

  app.use(cors());

  consign({ cwd: 'src' })
    .then('validations')
    .then('controllers')
    .then('routers') 
    .into(app);

  return app;
};
