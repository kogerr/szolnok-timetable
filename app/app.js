'use strict';

const app = require('express')();
const pretty = require('express-prettify');
const mongoose = require('mongoose');
require('../domain/busRoute');
const busRoute =  mongoose.model('busRoute');

let username = process.env.MONGODB_USERNAME;
let password = process.env.MONGODB_PASSWORD;
let host = process.env.MONGODB_HOST;
let port = process.env.MONGODB_PORT;
let db = process.env.MONGODB_DBNAME;

mongoose.connect('mongodb://' + username +  ':' + password + '@' +  host + '/' + db).then(
  () => {
    console.log('Successfully connected to database!');
  },
  (err) => { console.log(err); }
);

app.use(pretty({ query: 'pretty' }));

app.get('/', (request, response) => {
  response.send([
    {
      mapping: '/',
      description: 'Get mappings. Use ?pretty to prettify the output',
      method: 'GET'
    },
    {
      mapping: '/routes',
      description: 'Get all routes. Use ?pretty to prettify the output',
      method: 'GET'
    },
    {
      mapping: '/route/:routename',
      description: 'Get every detail of the given route. Use ?pretty to prettify the output',
      method: 'GET'
    }
  ]);
});

app.get('/routes', (request, response) => {
  let getBusRouteNames = busRoute.find({}).select({'routename': 1, '_id': 0, 'busStops.busStopName': 1});
  getBusRouteNames.exec((error, routenames) => {
    response.send(routenames);
  });
});

app.get('/route/:routename', (request, response) => {
  busRoute.findOne({routename: request.params.routename}, (err, route) => {
    if (err) {
      response.send(err);
    }
    if (route) {
      response.send(route);
    } else {
      response.send({
        response: 'Error',
        message: 'No such route!'
      });
    }
  });
});

console.log('Starting application');

app.listen(8080, () => console.log('Example app listening on port 3000!'));
