require('./../domain/busRoute');
const mongoose = require('mongoose');
const busRoute =  mongoose.model('busRoute');
const logger = require('./../logger/logger');
const errorObject = {"message": "Bad request"};

let buildResultOfTimetableQuery = (data, index, busStop, occurrence) => {
    let result = {};
    result.routename = data.routename;
    result.startStop = data.busRouteLines[index].startBusStop;
    result.endStop = data.busRouteLines[index].endBusStop;
    result.busStopName = busStop;
    result.occurrence = occurrence;

    let busStopIndex = -1;
    let foundOccurrences = 0;
    for (let i = 0; i < data.busRouteLines[index].busStops.length; i++) {
        if (data.busRouteLines[index].busStops[i].busStopName === busStop) {
            foundOccurrences++;
            if (occurrence === null || occurrence === undefined) {
                busStopIndex = i;
            } else if (foundOccurrences === parseInt(occurrence)) {
                busStopIndex = i;
            }
        }
    }
    if (busStopIndex < 0) {
        throw 'Error';
    }
    result.timetable = data.busRouteLines[index].busStops[busStopIndex];
    return result;
};

exports.getTimeTableOfBusStop = (busName, startStop, busStop, occurrence) => {
    return new Promise((resolve, reject) => {
        logger.info('Fetching timetable of [' + busName + '] from [' + startStop + '] in busStop [' + busStop + ']');
        busRoute.findOne({"routename": busName}, (err, data) => {
            if (!data || err) {
                logger.error('Can\'t fetch timetable of bus [' + busName + '] from [' + startStop + '] in busStop [' + busStop + '] ! Error: [' + err + '], data: [' + data + ']');
                reject(errorObject);
                return;
            }
            let result = {};
            try {
                if (startStop && data.busRouteLines[1] && data.busRouteLines[1].startBusStop === startStop) {
                    result = buildResultOfTimetableQuery(data, 1, busStop, occurrence);
                } else {
                    result = buildResultOfTimetableQuery(data, 0, busStop, occurrence);
                }
            } catch (buildError) {
                reject(errorObject);
            }
            resolve(result);
            return;
        });
    });
};