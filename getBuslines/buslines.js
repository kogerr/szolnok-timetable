const express = require('express');
const buslinesDao = require('./../getBuslines/buslinesDao');
const apicache = require('apicache');
const cache = apicache.middleware;
const router = express.Router();

const onlyStatus200 = (req, res) => res.statusCode === 200;
const cacheSuccesses = cache('50 minutes', onlyStatus200);

router.get('/', cacheSuccesses, (req, res) => {
    buslinesDao.getBuses()
        .then((data) => {
            res.statusCode = 200;
            res.send(data);
        }).catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
});

module.exports = router;