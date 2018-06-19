const mcache = require('memory-cache');

module.exports = cache = (duration) => {
    return (req, res, next) => {
      let key = '__express__' + req.originalUrl || req.url;
      let cachedBody = mcache.get(key);
      if (cachedBody) {
        console.log('Found in cache key=[' + key + ']');
        res.send(cachedBody);
        return;
      } else {
        console.log('Not found in cache key=[' + key + '], adding to it for [' + duration + '] seconds.');
        res.sendResponse = res.send;
        res.send = (body) => {
          mcache.put(key, body, duration * 1000);
          res.sendResponse(body);
        }
        next();
      }
    }
  };