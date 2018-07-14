const express = require('express');
const timetableDao = require('./../getTimetable/timetableDao');
const apicache = require('apicache');
const cache = apicache.middleware;
const router = express.Router();

const onlyStatus200 = (req, res) => res.statusCode === 200;
const cacheSuccesses = cache('50 minutes', onlyStatus200);

router.get('/:routename/:startStop/:busStop', cacheSuccesses, (req, res) => {
    timetableDao.getTimeTableOfBusStop(req.params.routename, req.params.startStop, req.params.busStop, req.query.occurrence)
        .then((data) => {
            res.statusCode = 200;
            res.send(data);
        }).catch((error) => {
            res.statusCode = 403;
            res.send(error);
        });
});

module.exports = router;