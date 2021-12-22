import ValidateExceptionns from '../../helpers/validateExceptions'
const { authJwt } = require("../../middlewares")

module.exports = function(app) {
    const controller = app.controllers.posts;
    const validations = app.validations.posts;

    const baseURL = '/api/posts';

    app.use(function(req, res, next) {
    res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
    );
    next();
    });

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

    // #swagger.tags = ['Post']
    // #swagger.description = 'Endpoint para obter um post específico.'
    // #swagger.parameters['postId'] = { description: 'ID do post.' }

    /* #swagger.responses[200] = { 
        description: 'Post encontrado.' 
    } */
    /* #swagger.responses[404] = { 
        description: 'Post não encontrado.' 
    } */
    /* #swagger.responses[500] = { 
        description: 'Ocorreu um erro ao processar a solicitação.' 
    } */

    baseValidateAndControllerCall('findOne', req, res)
    );

    app.get(`${baseURL}`, authJwt.verifyToken, (req, res) =>

    // #swagger.tags = ['Post']
    // #swagger.description = 'Endpoint para obter tos os posts.'
    /* #swagger.parameters['page'] = {
            type: 'integer',
            in: 'query'
    } */
    /* #swagger.parameters['size'] = {
            type: 'integer',
            in: 'query'
    } */

    /* #swagger.responses[200] = { 
        description: 'Post encontrado.' 
    } */
    /* #swagger.responses[500] = { 
        description: 'Ocorreu um erro ao processar a solicitação.' 
    } */

    baseValidateAndControllerCall('findAll', req, res)
    );

    app.post(`${baseURL}`, authJwt.verifyToken, (req, res) =>

    // #swagger.tags = ['Post']
    // #swagger.description = 'Endpoint para criar um novo post.'
    /* #swagger.parameters['title'] = {
            type: 'string'
    } */
    /* #swagger.parameters['body'] = {
            type: 'string'
    } */
    /* #swagger.parameters['tags'] = {
            type: 'array',
            example: ["a", "b", "b"]
    } */

    /* #swagger.responses[200] = { 
        description: 'Post criado com sucesso.' 
    } */
    /* #swagger.responses[500] = { 
        description: 'Ocorreu um erro ao processar a solicitação.' 
    } */
    baseValidateAndControllerCall('create', req, res)
    );

    app.put(`${baseURL}/:postId`, authJwt.verifyToken, (req, res) =>

    // #swagger.tags = ['Post']
    // #swagger.description = 'Endpoint para editar um post.'
    // #swagger.parameters['postId'] = { description: 'ID do post.' }
    /* #swagger.parameters['title'] = {
            type: 'string'
    } */
    /* #swagger.parameters['body'] = {
            type: 'string'
    } */
    /* #swagger.parameters['tags'] = {
            type: 'array',
            example: ["a", "b", "b"]
    } */

    /* #swagger.responses[200] = { 
        description: 'Post modificado com sucesso.' 
    } */
    /* #swagger.responses[404] = { 
        description: 'Post não encontrado.' 
    } */
    /* #swagger.responses[500] = { 
        description: 'Ocorreu um erro ao processar a solicitação.' 
    } */

    baseValidateAndControllerCall('update', req, res)
    );

    app.delete(`${baseURL}/:postId`, authJwt.verifyToken, (req, res) =>

    // #swagger.tags = ['Post']
    // #swagger.description = 'Endpoint para deletar um post.'

    /* #swagger.responses[200] = { 
        description: 'Post modificado com sucesso.' 
    } */
    /* #swagger.responses[404] = { 
        description: 'Post não encontrado.' 
    } */
    /* #swagger.responses[500] = { 
        description: 'Ocorreu um erro ao processar a solicitação.' 
    } */
    baseValidateAndControllerCall('delete', req, res)
    );
};