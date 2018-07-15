import BusRouteModel from './../domain/busRoute';
import logger from './../logger/logger';
const errorObject = {"message": "Bad request"};

export function getBuses(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
        logger.info('Fetching all buses');
        BusRouteModel.find({}).select({'routename': 1, '_id': 0}).exec((err, data) => {
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