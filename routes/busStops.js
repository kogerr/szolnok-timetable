const express = require('express');
const cache = require('./../cache/cache');
const busDao = require('./../dao/busDao');
const router = express.Router();

router.get('/:routename', cache(3600), (req, res) => {
    res.send('BusStops');
});

module.exports = router;