import { Router } from 'express';

import redis from 'redis';

const router = Router();

const client = redis.createClient(process.env.REDIS_URI);

client.set('counter', '0', 'NX');

// Add any common reducer state here, i.e. user data.
router.use(function(req, res, next) {
    res.locals.state = {};
    next();
});

router.route('/counter')
    .get(function(req, res, next) {
        client.get('counter', function(err, counter) {
            const payload = { counter: parseInt(counter) };
            res.format({
                // JSON first
                json() {
                    res.json(payload);
                },
                html() {
                    res.locals.state = payload;
                    next()
                }
            });
        });
    })
    .post(function(req, res) {
        client.get('counter', function(err, counter) {
            client.set('counter', '' + (parseInt(counter) + 1));
            res.json({ counter: parseInt(counter) + 1 })
        });
    });

export default router;
