import * as winston from 'winston';
import * as moment from 'moment';

const timestampFormat = () => moment().format('YYYY-MM-DD hh:mm:ss').trim();

const myFormat = winston.format.printf(info =>
    `[${info.timestamp} | ${info.level.toUpperCase()} | ${info.message}]`
);

export default winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({
            format: timestampFormat
        }),
        myFormat
    ),
    transports: [
        new winston.transports.Console()
    ]
});