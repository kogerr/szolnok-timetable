const winston = require('winston');
const moment = require('moment');

const timestampFormat = () => moment().format('YYYY-MM-DD hh:mm:ss').trim();

const myFormat = winston.format.printf(info => {
    return `[${info.timestamp} | ${info.level.toUpperCase()} | ${info.message}]`;
  });

module.exports = winston.createLogger({
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