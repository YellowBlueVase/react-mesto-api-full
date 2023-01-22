/* eslint-disable no-useless-escape */
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

Joi.objectId = require('joi-objectid')(Joi);

const celebrateUser = {
  body: Joi.object().keys({
    _id: Joi.objectId(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/),
    email: Joi.string().email(),
    password: Joi.string(),
  }).unknown(true),
};

router.get('/cards', getCards);

router.post('/cards', auth, celebrate(celebrateUser), createCard);

router.delete('/cards/:cardId', auth, celebrate(celebrateUser), deleteCard);

router.put('/cards/:cardId/likes', auth, celebrate(celebrateUser), likeCard);

router.delete('/cards/:cardId/likes', auth, celebrate(celebrateUser), dislikeCard);

module.exports = router;
