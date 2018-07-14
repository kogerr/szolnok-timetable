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