require('./../domain/busRoute');
const mongoose = require('mongoose');
const busRoute =  mongoose.model('busRoute');

const getBusesQuery = busRoute.find({}).select({'routename': 1, '_id': 0});

exports.getBuses = () => {
    return new Promise((resolve, reject) => {
        getBusesQuery.exec((err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data.map((element => {
              return element.routename;  
            })));
        });
    });
};


exports.getBusStops = (busName, startStop) => {

};

exports.getTimeTableOfBusStop = (busName, startStop, day) => {

};