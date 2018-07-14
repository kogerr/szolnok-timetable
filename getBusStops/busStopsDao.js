require('./../domain/busRoute');
const mongoose = require('mongoose');
const busRoute =  mongoose.model('busRoute');
const logger = require('./../logger/logger');
const errorObject = {"message": "Bad request"};


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