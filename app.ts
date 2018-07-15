import * as express from 'express';
import * as mongoose from 'mongoose';
import buslines from './getBuslines/buslines';
import busStops from './getBusStops/busStops';
import timetable from './getTimetable/timetable';
import logger from './logger/logger';
import { AddressInfo } from 'net';
import { Request, Response, Express } from 'express';

let app: Express = express();

let username = process.env.MONGODB_USERNAME;
let password = process.env.MONGODB_PASSWORD;
let host = process.env.MONGODB_HOST;
let port = process.env.MONGODB_PORT;
let db = process.env.MONGODB_DBNAME;

mongoose.connect('mongodb://' + username + ':' + password + '@' + host + ':' + port + '/' + db).then(
  () => {
    logger.info('Successfully connected to database!');
  },
  (err) => { logger.error(err); }
);

let expressLogger = (req, res, next) => {
  logger.info('Method: ' + req.method + ', url: ' + req.originalUrl + ',  body: ' + req.body);
  next();
};

app.set('port', 8080);

app.use(expressLogger);
app.use('/buses', buslines);
app.use('/busStop', busStops);
app.use('/timetable', timetable);

let server = app.listen(app.get('port'), () => {
  let port = (server.address() as AddressInfo).port;
  logger.info('Listening on port ' + port);
});
