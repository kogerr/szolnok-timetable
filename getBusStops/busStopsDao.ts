import BusRouteModel from '../domain/busRoute';
import logger from '../logger/logger';
import { BusStops } from '../models/bus-stops';
const errorObject = { "message": "Bad request" };


function buildResultOfBusStopsQuery(data: any, index: number): BusStops {
    let routename = data.routename;
    let startStop = data.busRouteLines[index].startBusStop;
    let endStop = data.busRouteLines[index].endBusStop;
    let busStops = data.busRouteLines[index].busStops.map(e => e.busStopName);
    return { routename, startStop, endStop, busStops };
};


export function getBusStops(busName: string, startStop: string): Promise<BusStops> {
    return new Promise((resolve, reject) => {
        logger.info('Fetching busStops of [' + busName + '] with startStop [' + startStop + ']');
        BusRouteModel.findOne({ "routename": busName }, (err, data) => {
            if (!data || err) {
                logger.error('Can\'t fetch busStops of bus [' + busName + '] and startStop [' + startStop + ']! Error: [' + err + '], data: [' + data + ']');
                reject(errorObject);
            }
            let result: BusStops;
            if (startStop && data.busRouteLines[1] && data.busRouteLines[1].startBusStop === startStop) {
                result = buildResultOfBusStopsQuery(data, 1);
            } else {
                result = buildResultOfBusStopsQuery(data, 0);
            }
            resolve(result);
        });
    });
};
