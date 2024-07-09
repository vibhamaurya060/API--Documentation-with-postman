import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hello World',
      version: '1.0.0',
    },
    servers: [{url: "http://localhost:8080"},{url: "http://localhost:9090"}]
  },
  apis: ['./src/routes/*.js'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

export default openapiSpecification;