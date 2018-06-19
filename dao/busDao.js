require('./../domain/busRoute');
const mongoose = require('mongoose');
const busRoute =  mongoose.model('busRoute');

exports.getBuses = () => {
    return new Promise((resolve, reject) => {
        busRoute.find({}).select({'routename': 1, '_id': 0}).exec((err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data.map((element => {
              return element.routename;  
            })));
        });
    });
};

let buildResultOfBusStopsQuery = (data, index) => {
    let result = {};
    result.routename = data.routename;
    result.startStop = data.busRouteLines[index].startBusStop;
    result.endStop = data.busRouteLines[index].endBusStop;
    result.busStops = data.busRouteLines[index].busStops.map((element) => {
        return element.busStopName;
    });
    return result;
};


exports.getBusStops = (busName, startStop) => {
    return new Promise((resolve, reject) => {
        busRoute.findOne({"routename": busName}, (err, data) => {
            if (err) {
                reject(err);
            }
            let result = {};
            if (startStop && data.busRouteLines[1] && data.busRouteLines[1].startBusStop === startStop) {
                result = buildResultOfBusStopsQuery(data, 1);
            } else {
                result = buildResultOfBusStopsQuery(data, 0);
            }
            resolve(result);
        });
    });
};

exports.getTimeTableOfBusStop = (busName, startStop, day) => {

};