import { Router } from 'express';
import * as tokenService from '../services/tokenService';

const router = Router();

/**
 * POST /api/token
 */
router.post('/', (req, res, next) => {
  tokenService
    .login(req.body.email, req.body.password)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

export default router;
