require('./../domain/busRoute');
const mongoose = require('mongoose');
const busRoute =  mongoose.model('busRoute');
const logger = require('./../logger/logger');
const errorObject = {"message": "Bad request"};


exports.getBuses = () => {
    return new Promise((resolve, reject) => {
        logger.info('Fetching all buses');
        busRoute.find({}).select({'routename': 1, '_id': 0}).exec((err, data) => {
            if (err || !data) {
                logger.error('Can\'t fetch buses! Error: [' + err + '], data: [' + data + ']');
                logger.error('error: ' + err);
                logger.error('data: ' + data);
                reject(errorObject);
                return;
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
        logger.info('Fetching busStops of [' + busName + '] with startStop [' + startStop + ']');
        busRoute.findOne({"routename": busName}, (err, data) => {
            if (!data || err) {
                logger.error('Can\'t fetch busStops of bus [' + busName + '] and startStop [' + startStop + ']! Error: [' + err + '], data: [' + data + ']');
                reject(errorObject);
                return;
            }
            let result = {};
            if (startStop && data.busRouteLines[1] && data.busRouteLines[1].startBusStop === startStop) {
                result = buildResultOfBusStopsQuery(data, 1);
            } else {
                result = buildResultOfBusStopsQuery(data, 0);
            }
            resolve(result);
            return;
        });
    });
};

exports.getTimeTableOfBusStop = (busName, startStop, day) => {

};