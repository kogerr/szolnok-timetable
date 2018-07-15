import BusRouteModel from './../domain/busRoute';
import logger from './../logger/logger';
const errorObject = { "message": "Bad request" };


function buildResultOfBusStopsQuery(data, index): { routename: string, startStop: string, endStop: string, busStops: Array<string> } {
    let routename = data.routename;
    let startStop = data.busRouteLines[index].startBusStop;
    let endStop = data.busRouteLines[index].endBusStop;
    let busStops = data.busRouteLines[index].busStops.map(e => e.busStopName);
    return { routename, startStop, endStop, busStops };
};


export function getBusStops(busName, startStop): Promise<any> {
    return new Promise((resolve, reject) => {
        logger.info('Fetching busStops of [' + busName + '] with startStop [' + startStop + ']');
        BusRouteModel.findOne({ "routename": busName }, (err, data) => {
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