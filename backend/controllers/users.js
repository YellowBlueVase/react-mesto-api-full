/* eslint-disable no-underscore-dangle */
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
// Bad request
const ERROR_CODE_400 = require('../errors/error400');
// Not Found
const ERROR_CODE_404 = require('../errors/error404');
// Conflict
const ERROR_CODE_409 = require('../errors/error409');

const opts = {
  new: true,
  runValidators: true,
};
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });

      res.send({ token });
    })
    .catch(next);
};

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) {
        throw new ERROR_CODE_400('Переданы некорректные данные при создании пользователя.');
      }
      res.send({ data: users });
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .catch(() => { throw new ERROR_CODE_404('Пользователь по указанному _id не найден.'); })
    .then((user) => {
      if (!user) {
        throw new ERROR_CODE_400('Пользователь по указанному _id не найден.');
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.getProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new ERROR_CODE_404('Пользователь по указанному _id не найден.');
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .catch(() => {
      throw new ERROR_CODE_409('Пользователь с таким email адресом уже зарегистрирован');
    })
    .then((user) => {
      if (!user) {
        throw new ERROR_CODE_404('Пользователь по указанному _id не найден.');
      }
      res.send({
        data: {
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
          _id: user._id,
          __v: user.__v,
        },
      });
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    opts,
  )
    .then((user) => {
      if (!user) {
        throw new ERROR_CODE_404('Пользователь по указанному _id не найден.');
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { new: true },
    opts,
  )
    .then((user) => {
      if (!user) {
        throw new ERROR_CODE_404('Пользователь по указанному _id не найден.');
      }
      res.send({ data: user });
    })
    .catch(next);
};
