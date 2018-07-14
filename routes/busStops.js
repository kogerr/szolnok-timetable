const express = require('express');
const busDao = require('./../dao/busDao');
const apicache = require('apicache');
const cache = apicache.middleware;
const router = express.Router();

const onlyStatus200 = (req, res) => res.statusCode === 200;
const cacheSuccesses = cache('50 minutes', onlyStatus200);

router.get('/:routename', cacheSuccesses, (req, res) => {
    busDao.getBusStops(req.params.routename, req.query.startStop)
        .then((data) => {
            res.statusCode = 200;
            res.send(data);
        }).catch((error) => {
            res.statusCode = 403;
            res.send(error);
        });
});

module.exports = router;