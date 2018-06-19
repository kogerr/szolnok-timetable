# Szolnok-timetable

REST API for [szolnok-timetable-mobile](https://github.com/cszoltan422/szolnok-timetable/) application. 
You can directly call the services [here](http://45.76.89.91/).

### Mappings:

| Mapping       | Resource      |
| ------------- | ------------- |
| `/buses`        | Returns the list of bus names currently running in [Szolnok](https://www.google.hu/maps/place/Szolnok/@47.1803166,20.043589,11z/data=!3m1!4b1!4m5!3m4!1s0x474141123b36bec5:0x400c4290c1e11d0!8m2!3d47.1621355!4d20.1824712) (My home town :))  |
| `/busStops/:busname?startStop=<start-bus-stop>`  | Return the list of busStops of the given bus. As some buses have multiple routes, you can specify one by it's starting stop. If not present the first is returned  |
| `/timetable/:busname/stop?startStop=<start-bus-stop>` | Returns the today's and tomorrow's timetable of a given busstop for a given bus  |
