import ValidateExceptionns from '../../helpers/validateExceptions';

module.exports = function(app) {
  const service = app.controllers.posts;
  const validations = app.validations.posts;

  const baseURL = '/api/posts';

  const baseValidateAndControllerCall = async (serviceName, req, res) => {
    const errors = await validations[serviceName](req, res);
    if (errors.length === 0) {
      service[serviceName](req, res);
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

  app.get(`${baseURL}/:postId`, (req, res) =>
    baseValidateAndControllerCall('findOne', req, res)
  );

  app.get(`${baseURL}`, (req, res) =>
    baseValidateAndControllerCall('findAll', req, res)
  );

  app.post(`${baseURL}`, (req, res) =>
    baseValidateAndControllerCall('create', req, res)
  );

  app.put(`${baseURL}/:postId`, (req, res) =>
    baseValidateAndControllerCall('update', req, res)
  );

  app.delete(`${baseURL}/:postId`, (req, res) =>
    baseValidateAndControllerCall('delete', req, res)
  );
};