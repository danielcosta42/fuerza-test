module.exports = function(app) {
    const swaggerUi = require('swagger-ui-express')
    const swaggerFile = require('../../../swagger.json')
    app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
}