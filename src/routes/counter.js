import { Router } from "express";
import { client } from "../utils/redis-utils";

const router = Router();

client.set('counter', '0', 'NX');

router.route('/')
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
