import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as userService from '../services/userService';
import { userValidator } from '../validators/user';
import passport from 'passport';

require('./../middlewares/passport')(passport);

const router = Router();

/**
 * GET /api/users
 */
router.get('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  userService
    .getAllUsers(req)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * GET /api/users/:id
 */
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  userService
    .getUser(req.params.id)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * POST /api/users
 */
router.post('/', userValidator, (req, res, next) => {
  userService
    .createUser(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
});

// /**
//  * PUT /api/users/:id
//  */
// router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
//   userService
//     .updateUser(req.params.id, req.body)
//     .then(data => res.json({ data }))
//     .catch(err => next(err));
// });

// /**
//  * DELETE /api/users/:id
//  */
// router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
//   userService
//     .deleteUser(req.params.id)
//     .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
//     .catch(err => next(err));
// });

export default router;
