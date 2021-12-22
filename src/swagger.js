const swaggerAutogen = require('swagger-autogen')()

const outputFile = 'swagger.json'
const endpointsFiles = ['src/routers/api/posts.js', 'src/routers/api/auth.js']

swaggerAutogen(outputFile, endpointsFiles)