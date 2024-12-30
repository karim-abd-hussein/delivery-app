import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Delivery Application API',
      version: '1.0.0',
      description: 'API documentation for the Delivery Application',
    },
  },
  apis: ['../routes/*.ts'], // Path to files with Swagger comments
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
export default swaggerDocs;
