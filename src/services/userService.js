import User from '../models/user';
import Boom from 'boom';

/**
 * Create new user.
 *
 * @param  {Object}  user
 * @return {Promise}
 */
export function createUser(userData) {
  return new User({
    firstname: userData.firstname,
    lastname: userData.lastname,
    email: userData.email,
    password: userData.password,
    phone: userData.phone,
    role: 'user',
    active: true
  })
    .save()
    .then(user => {
      return user;
    })
    .catch(err => {
      if (err.code === 11000) {
        throw Boom.badRequest('Email already taken.');
      }
      throw Boom.badRequest('Unknown error.');
    });
}

/**
 * Get all users from DB with options.
 *
 * @param {Object} req
 * @return {Promise}
 */
export function getAllUsers(req) {
  // var query   = {};
  // var options = {
  //     select:   'title date author',
  //     sort:     { date: -1 },
  //     populate: 'author',
  //     lean:     true,
  //     offset:   20,
  //     limit:    10
  // };

  let page = req.query.page ? req.query.page * 1 : 1;
  let limit = req.query.limit ? req.query.limit * 1 : 5;
  let sort = req.query.sort ? req.query.sort : '';

  return User.paginate({}, { page: page, limit: limit, sort: sort }).then(users => {
    return users;
  });

  // const { text, page, limit, sort } = req.query;
  // let aggregate = [];
  // if (typeof text !== 'undefined') {
  //   aggregate.push({
  //     $match: {
  //       $or: [{ firstname: { $regex: text, $options: 'i' } }, { lastname: { $regex: text, $options: 'i' } }, { email: { $regex: text, $options: 'i' } }, { role: { $regex: text, $options: 'i' } }, { entryDate: { $regex: text, $options: 'i' } }]
  //     }
  //   });
  // }
  // if (typeof page !== 'undefined' && typeof limit !== 'undefined') {
  //   let skip = (page - 1) * limit;
  //   aggregate.push({ $skip: skip });
  //   aggregate.push({ $limit: parseInt(limit) });
  // } else if (typeof limit !== 'undefined') {
  //   aggregate.push({ $limit: parseInt(limit) });
  // }
  // if (typeof sort !== 'undefined') {
  //   let order = sort.substring(0, 1) === '-' ? -1 : 1;
  //   let field = sort;
  //   if (field.charAt(0) === '-' || field.charAt(0) === '+') {
  //     field = field.substring(1);
  //   }
  //   field = field.replace(/^\s+|\s+$/g, '');
  //   aggregate.push({
  //     $sort: {
  //       [field]: order
  //     }
  //   });
  // }
  // // Default
  // if (aggregate.length === 0) {
  //   aggregate.push({ $sort: { firstname: 1 } });
  // }

  // return User.aggregate(aggregate).then(data => {
  //   return data;
  // });
}

/**
 * Get user from DB.
 *
 * @param {String|Number} id
 * @return {Promise}
 */
export function getUser(id) {
  return User.findOne({ _id: id })
    .then(user => {
      return user;
    })
    .catch(() => {
      throw Boom.notFound('User not found.');
    });
}

/**
 * Actualiza información de un registro.
 * @param {firstname, lastname, email, password, role} req
 * @param {json} res
 */
export const update = (req, res) => {
  const { firstname, lastname, email, password, role, active } = req.body;

  const refs = {
    email
  };

  const updates = {
    firstname,
    lastname,
    email,
    password,
    role,
    active
  };

  User.update(refs, updates, function(err, id) {
    if (err) {
      return res.json({ error: true, data: err, message: 'No se pudo Actualizar el registro' });
    } else {
      res.json({ error: false, data: id, message: 'Se actualizo correctamente' });
    }
  });
};

/**
 * Da de baja un registro
 * @param {refs} req
 * @param {json} res
 */
// export const remove = (req, res) => {
//   const { id } = req.body;
//   User.update({ _id: id }, { active: false }, function(err, id, resp) {
//     if (err) {
//       return res.json({ error: true, data: err, message: 'No se pudo dar de baja el registro' });
//     } else {
//       res.json({ error: false, data: id, message: 'Se actualizo correctamente' });
//     }
//   });
// };
