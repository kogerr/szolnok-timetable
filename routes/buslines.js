const express = require('express');
const cache = require('./../cache/cache');
const router = express.Router();

router.get('/', cache(3600), (req, res) => {
  res.send('Buslines');
});

module.exports = router;