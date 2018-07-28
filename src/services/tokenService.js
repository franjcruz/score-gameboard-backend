// import Boom from 'boom';
import { validateCredentials } from './userService';
// import User from '../models/user';
import * as jwt from './jwtService';

/**
 * Token request.
 *
 * @param  {String}  email
 * @param  {String}  password
 * @return {Promise}
 */
export function login(email, password) {
  return validateCredentials(email, password).then(user => {
    let token = jwt.generate(user.attributes);

    return token;
  });
}
