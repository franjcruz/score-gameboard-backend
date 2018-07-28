import Joi from 'joi';
import validate from '../utils/validate';
import * as userService from '../services/userService';

const SCHEMA = {
  firstname: Joi.string()
    .label('firstname')
    .max(255)
    .required(),
  lastname: Joi.string()
    .label('lastname')
    .max(255)
    .required(),
  email: Joi.string()
    .email()
    .label('email')
    .max(255)
    .required(),
  password: Joi.string()
    .label('password')
    .min(6)
    .max(15)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s)(?=.*[^\da-zA-Z]).{6,15}$/, 'The password must be between 6 and 15 characters and must contain at least one symbol, one number, one uppercase and one lowercase.')
    .required(),
  phone: Joi.string()
    .label('phone')
    .regex(/[0-9]{6,14}/, 'Invalid phone number ')
    .required()
};

/**
 * Validate create/update user request.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function userValidator(req, res, next) {
  return validate(req.body, SCHEMA)
    .then(() => next())
    .catch(err => next(err));
}

/**
 * Validate users existence.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function findUser(req, res, next) {
  return userService
    .getUser(req.params.id)
    .then(() => next())
    .catch(err => next(err));
}

export { findUser, userValidator };
