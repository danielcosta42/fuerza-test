import ValidateExceptionns from '../../helpers/validateExceptions';
const { authJwt } = require("../../middlewares");

module.exports = function(app) {
  const controller = app.controllers.posts;
  const validations = app.validations.posts;

  const baseURL = '/api/posts';

  const baseValidateAndControllerCall = async (serviceName, req, res) => {
    const errors = await validations[serviceName](req, res);
    if (errors.length === 0) {
        controller[serviceName](req, res);
    } else {
      res
        .status(400)
        .send(
          new ValidateExceptionns(
            400,
            'Erro ao processar solicitação!',
            req.url,
            errors
          )
        );
    }
  };

  app.get(`${baseURL}/:postId`, authJwt.verifyToken, (req, res) =>
    baseValidateAndControllerCall('findOne', req, res)
  );

  app.get(`${baseURL}`, authJwt.verifyToken, (req, res) =>
    baseValidateAndControllerCall('findAll', req, res)
  );

  app.post(`${baseURL}`, authJwt.verifyToken, (req, res) =>
    baseValidateAndControllerCall('create', req, res)
  );

  app.put(`${baseURL}/:postId`, authJwt.verifyToken, (req, res) =>
    baseValidateAndControllerCall('update', req, res)
  );

  app.delete(`${baseURL}/:postId`, authJwt.verifyToken, (req, res) =>
    baseValidateAndControllerCall('delete', req, res)
  );
};