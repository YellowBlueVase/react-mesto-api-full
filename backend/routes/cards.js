/* eslint-disable no-useless-escape */
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/cards', auth, getCards);

router.post('/cards', auth, celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().regex(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/),
    }).unknown(true),
  },
), createCard);

router.delete('/cards/:cardId', celebrate(
  {
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  },
), auth, deleteCard);

router.put('/cards/:cardId/likes', celebrate(
  {
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  },
), auth, likeCard);

router.delete('/cards/:cardId/likes', celebrate(
  {
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  },
), auth, dislikeCard);

module.exports = router;
