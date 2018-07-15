import BusRouteModel from '../domain/busRoute';
import logger from '../logger/logger';
import { Timetable } from '../models/timetable';
const errorObject = { "message": "Bad request" };

let buildResultOfTimetableQuery = (data, index: number, busStop: string, occurrence: string): Timetable => {
    let routename = data.routename;
    let startStop = data.busRouteLines[index].startBusStop;
    let endStop = data.busRouteLines[index].endBusStop;
    let busStopName = busStop;

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
    let timetable = data.busRouteLines[index].busStops[busStopIndex];
    return { routename, startStop, endStop, busStopName, occurrence, timetable };
};

export function getTimeTableOfBusStop(busName: string, startStop: string, busStop: string, occurrence: string): Promise<Timetable> {
    return new Promise((resolve, reject) => {
        logger.info('Fetching timetable of [' + busName + '] from [' + startStop + '] in busStop [' + busStop + ']');
        BusRouteModel.findOne({ "routename": busName }, (err, data) => {
            if (!data || err) {
                logger.error('Can\'t fetch timetable of bus [' + busName + '] from [' + startStop + '] in busStop [' + busStop + '] ! Error: [' + err + '], data: [' + data + ']');
                reject(errorObject);
            }
            let result: Timetable;
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
        });
    });
};
