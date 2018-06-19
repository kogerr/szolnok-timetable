let app = require('./app/express/express');
let mongoose = require('mongoose');
let buslines = require('./routes/buslines');
let busStops = require('./routes/busStops');

let username = process.env.MONGODB_USERNAME;
let password = process.env.MONGODB_PASSWORD;
let host = process.env.MONGODB_HOST;
let port = process.env.MONGODB_PORT;
let db = process.env.MONGODB_DBNAME;

mongoose.connect('mongodb://' + username + ':' + password + '@' + host + ':' + port + '/' + db).then(
  () => {
    console.log('Successfully connected to database!');
  },
  (err) => { console.log(err); }
);

app.set('port', 8080);

app.use('/buses', buslines);
app.use('/busStop', busStops);

let server = app.listen(app.get('port'), function () {
    let port = server.address().port;
    console.log('Listening on port ' + port);
});