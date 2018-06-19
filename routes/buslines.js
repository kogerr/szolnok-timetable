const express = require('express');
const cache = require('./../cache/cache');
const busDao = require('./../dao/busDao');
const router = express.Router();

router.get('/', cache(3600), (req, res) => {
    busDao.getBuses()
        .then((data) => {
            res.statusCode = 200;
            res.send(data);
        }).catch((err) => {
            console.log(err);
            res.statusCode = 500;
            res.send(err);
        });
});

module.exports = router;