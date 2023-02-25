/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const Card = require('../models/cards');
const User = require('../models/users');

// Bad request
const ERROR_CODE_400 = require('../errors/error400');
// Forbidden
const ERROR_CODE_403 = require('../errors/error403');
// Not Found
const ERROR_CODE_404 = require('../errors/error404');

const opts = {
  new: true,
  runValidators: true,
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        throw new ERROR_CODE_400('Переданы некорректные данные при создании карточки.');
      }
      res.send({ data: cards });
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = { _id: req.user._id };
  Card.create({ name, link, owner })
    .then((card) => {
      if (!card) {
        throw new ERROR_CODE_400('Переданы некорректные данные при создании карточки.');
      }
      res.send({ data: card });
      // Если захочу получать просто карточку, а не объект, то data : надо будет удалить
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      const owner = card.owner.toString();
      if (req.user._id === owner) {
        Card.deleteOne(card)
          .then(() => {
            res.send(card);
          })
          .catch(next);
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    opts,
  )
    .then((card) => {
      if (!card) {
        throw new ERROR_CODE_400('Переданы некорректные данные при создании карточки.');
      }
      res.send({ data: card });
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    opts,
  )
    .then((card) => {
      if (!card) {
        throw new ERROR_CODE_403('Переданы некорректные данные при создании карточки.');
      }
      res.send({ data: card });
    })
    .catch(next);
};
