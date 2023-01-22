/* eslint-disable no-useless-escape */
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  getAllUsers, getUser, getProfile, updateProfile, updateAvatar, login, createUser,
} = require('../controllers/users');

Joi.objectId = require('joi-objectid')(Joi);

const celebrateUser = {
  body: Joi.object().keys({
    _id: Joi.objectId(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(true),
};

router.get('/users', auth, getAllUsers);

router.get('/users/:userId', celebrate(celebrateUser), auth, getUser);

router.get('/users/me', auth, getProfile);

router.patch('/users/me', celebrate(celebrateUser), auth, updateProfile);

router.patch('/users/me/avatar', celebrate(celebrateUser), auth, updateAvatar);

router.post('/signin', celebrate(celebrateUser), login);

router.post('/signup', celebrate(celebrateUser), createUser);

module.exports = router;
