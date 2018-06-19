const express = require('express');
const cache = require('./../cache/cache');
const busDao = require('./../dao/busDao');
const router = express.Router();

router.get('/:routename', cache(3600), (req, res) => {
    busDao.getBusStops(req.params.routename, req.query.startStop)
        .then((data) => {
            res.statusCode = 200;
            res.send(data);
        }).catch((error) => {
            console.log(error);
            res.statusCode = 500;
            res.send(error);
        });
});

module.exports = router;