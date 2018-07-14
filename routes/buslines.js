const express = require('express');
const busDao = require('./../dao/busDao');
const apicache = require('apicache');
const cache = apicache.middleware;
const router = express.Router();

const onlyStatus200 = (req, res) => res.statusCode === 200;
const cacheSuccesses = cache('50 minutes', onlyStatus200);

router.get('/', cacheSuccesses, (req, res) => {
    busDao.getBuses()
        .then((data) => {
            res.statusCode = 200;
            res.send(data);
        }).catch((err) => {
            console.log('buslinses: ' + err);
            res.statusCode = 500;
            res.send(err);
        });
});

module.exports = router;