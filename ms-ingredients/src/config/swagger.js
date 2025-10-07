// config/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ingredients API',
            version: '1.0.0',
            description: 'RESTful API for pizza management (SQLite, Express).'
        },
        servers: [
            { url: 'http://localhost:3000', description: 'Local dev server' }
        ]
    },
    apis: ['../routes/*.js', "../ingredients/*.js"] // pick up JSDoc in routes/pizzas
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
