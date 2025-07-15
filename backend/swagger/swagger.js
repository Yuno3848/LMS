import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'LMS Book API',
      version: '1.0.0',
      description: 'Learning Management System API Documentation',
    },
    servers: [
      {
        url: 'http://localhost:8080/api/v1', // Changed from 8000 to 8080
        description: 'Development server',
      },
    ],
  },
  apis: [
    './routes/*.js',
    './swagger/*.swagger.js', // Make sure this path is correct
  ],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app, port) => {
  // Swagger page
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log(`📚 Swagger docs available at http://localhost:${port}/api-docs`);
};

export default swaggerDocs;
