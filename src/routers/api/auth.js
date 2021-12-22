const { verifySignUp } = require("../../middlewares");

module.exports = function(app) {
    const controller = app.controllers.auth;
    const baseURL = '/api/auth';


    app.use(function(req, res, next) {

        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(`${baseURL}/signup`,
        [
        verifySignUp.checkDuplicateUsernameOrEmail,
        ],
        controller.signup
        // #swagger.tags = ['User']
        // #swagger.description = 'Endpoint para criar um novo usuário.'
        /* #swagger.parameters['username'] = {
                type: 'string'
        } */
        /* #swagger.parameters['email'] = {
                type: 'string'
        } */
        /* #swagger.parameters['password'] = {
                type: 'string'
        } */

        /* #swagger.responses[200] = { 
               description: 'Usuário criado.' 
        } */
         /* #swagger.responses[500] = { 
               description: 'Falha ao criar o usuário.' 
        } */
    );

    app.post(`${baseURL}/signin`, controller.signin
        // #swagger.tags = ['User']
        // #swagger.description = 'Endpoint para fazer login.'
        /* #swagger.parameters['username'] = {
                type: 'string'
        } */
        /* #swagger.parameters['password'] = {
                type: 'string'
        } */

        /* #swagger.responses[200] = { 
               description: 'Usuário logado com sucesso.' 
        } */
        /* #swagger.responses[500] = { 
               description: 'Falha ao fazer login.' 
        } */
        /* #swagger.responses[401] = { 
               description: 'Senha inválida.' 
        } */
        /* #swagger.responses[404] = { 
               description: 'Usuário não encontrado.' 
        } */
    );
};