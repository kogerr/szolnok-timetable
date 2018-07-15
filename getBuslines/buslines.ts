import * as express from 'express';
import * as buslinesDao from './../getBuslines/buslinesDao';
import * as apicache from 'apicache';
const cache = apicache.middleware;
const router: express.Router = express.Router();

const onlyStatus200 = (req, res): boolean => res.statusCode === 200;
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

export default router;