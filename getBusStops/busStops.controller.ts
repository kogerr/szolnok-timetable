import * as express from 'express';
import * as busStopsDao from './busStopsDao';
import * as apicache from 'apicache';
const cache = apicache.middleware;
let router: express.Router = express.Router();

const onlyStatus200 = (req, res) => res.statusCode === 200;
const cacheSuccesses = cache('50 minutes', onlyStatus200);

router.route('/:routename').get(cacheSuccesses, (req, res) => {
    busStopsDao.getBusStops(req.params.routename, req.query.startStop)
        .then((data) => {
            res.statusCode = 200;
            res.send(data);
        }).catch((error) => {
            res.statusCode = 403;
            res.send(error);
        });
});

export default router;
