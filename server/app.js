import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import routes from './routes';


// Set up the express app
const app = express();
// swagger definition
const swaggerDefinition = {
  info: {
    title: 'NSDMS API',
    version: '1.0.0',
    description: `Non-sucking Document Management System,
                  a document management system that manages a registered user
                  documents`,
  },
  host: 'localhost:5000',
  basePath: '/',
};

const swaggerPath = path.join(__dirname, 'routes/*.js');
// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: [swaggerPath],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// serve swagger
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect(`http://${req.hostname}${req.url}`);
  } else {
    next();
  }
});
if (!process.env.NODE_ENV) {
  // Log requests to the console.
  app.use(logger('dev'));
  app.use(express.static('lib/public'));

  // Parse incoming requests data (https://github.com/expressjs/body-parser)
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // Cross Origin access
  app.use(cors());


  // Making the server know that we have added routes
  routes(app);

  // app.get('/api', (req, res) => {
  //   res.sendFile(path.join(__dirname, '../api-docs/index.html'));
  // });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../lib/public/index.html'));
  });
} else {
  app.use(express.static('public'));

  // Parse incoming requests data (https://github.com/expressjs/body-parser)
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // Cross Origin access
  app.use(cors());


  // Making the server know that we have added routes
  routes(app);

  // app.get('/api', (req, res) => {
  //   res.sendFile(path.join(__dirname, '../api-docs/index.html'));
  // });
}


app.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Welcome to the NSDMS API Server');
});


export default app;
