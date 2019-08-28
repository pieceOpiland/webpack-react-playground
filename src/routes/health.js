import { Router } from 'express';

const router = new Router();

router.route('/')
    .get(function(req, res, next) {
        res.format({
            json() {
                res.json({health: "OK"})
            },
            html() {
                res.locals.state.health = "OK";
                next();
            }
        })
    });

export default router;