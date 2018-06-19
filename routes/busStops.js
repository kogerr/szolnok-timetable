const express = require('express');
const cache = require('./../cache/cache');
const router = express.Router();

router.get('/:routename', cache(3600), (req, res) => {
    res.send('BusStops');
});

module.exports = router;