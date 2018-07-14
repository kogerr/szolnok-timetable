let app = require('express')();
let mongoose = require('mongoose');
let buslines = require('./routes/buslines');
let busStops = require('./routes/busStops');
let timetable = require('./routes/timetable');
let logger = require('./logger/logger');

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
    let port = server.address().port;
    logger.info('Listening on port ' + port);
});