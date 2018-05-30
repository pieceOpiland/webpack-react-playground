import { Router } from 'express';

const router = Router();

let counter = 0;

router.use(function(req, res, next) {
    res.locals.state = {};
    next();
});

router.route('/counter')
    .get(function(req, res, next) {
        const payload = { counter };
        res.format({
            // JSON first
            json() {
                res.json(payload);
            },
            html() {
                res.locals.state = payload;
                next()
            }
        })
    })
    .post(function(req, res) {
        counter += 1;
        res.json({ counter })
    });

export default router;
