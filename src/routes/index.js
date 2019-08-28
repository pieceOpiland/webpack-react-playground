import { Router } from 'express';

import health from './health';
import counter from './counter';

const router = Router();

// Add any common reducer state here, i.e. user data.
router.use(function(req, res, next) {
    res.locals.state = {};
    next();
});

router.use('/health', health);
router.use('/counter', counter);

export default router;
