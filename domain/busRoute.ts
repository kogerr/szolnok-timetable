import * as mongoose from 'mongoose';

const busRouteSchema  = mongoose.Schema({
	routename: 'String',
	busRouteLines: [{
        startBusStop: 'String',
        endBusStop: 'String',
        busStops: [{
            busStopName: 'String',
            workDaySchedule: {
                busArrivals: [{
                    lowfloor: 'Boolean',
                    arrivalHour: 'Number',
                    arrivalMinute: 'Number'
                }]                                
            },
            saturdaySchedule: {
                busArrivals: [{
                    lowfloor: 'Boolean',
                    arrivalHour: 'Number',
                    arrivalMinute: 'Number'
                }]                                
            },
            sundaySchedule: {
                busArrivals: [{
                    lowfloor: 'Boolean',
                    arrivalHour: 'Number',
                    arrivalMinute: 'Number'
                }]                                
            }
        }]
	}],
	_class: 'String'
});

export default mongoose.model('busRoute', busRouteSchema, 'busRoute');
