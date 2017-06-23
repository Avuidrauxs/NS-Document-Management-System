import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';


// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cross Origin access
app.use(cors());

// authenticate(app,express);
// Making the server know that we have added routes
routes(app);


// Setup a default catch-all route that sends back a welcome message in JSON format.
// app.get('*', (req, res) => res.status(200).send({
//   message: 'I am a banana',
// }));

app.use(express.static('lib/public'));
// app.all('*', function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
//      // intercept OPTIONS method
//     if ('OPTIONS' === req.method) {
//       res.send(200);
//     }
//     else {
//       next();
//     }
// });

export default app;
