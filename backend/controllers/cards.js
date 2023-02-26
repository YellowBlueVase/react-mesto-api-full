/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const Card = require('../models/cards');

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
        res.send({ data: [] });
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
        throw new ERROR_CODE_404('Карточка не найдена, проверьте корректность запроса.');
      }
      res.send({ data: card });
      // Если захочу получать просто карточку, а не объект, то data : надо будет удалить
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ERROR_CODE_400('Карточка не создана, проверьте корректность запроса.'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new ERROR_CODE_404('Карточка не найдена, проверьте корректность запроса.');
      }
      const owner = card.owner.toString();
      if (req.user._id === owner) {
        Card.deleteOne(card)
          .then(() => {
            res.send(card);
          });
        throw new ERROR_CODE_403('Вы не можете удалить чужую карточку.');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ERROR_CODE_400('Карточка не удалена, проверьте корректность запроса.'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    opts,
  )
    .then((card) => {
      if (!card) {
        throw new ERROR_CODE_404('Карточка не найдена, проверьте корректность запроса.');
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ERROR_CODE_400('Лайк не добавлен, проверьте корректность запроса.'));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    opts,
  )
    .then((card) => {
      if (!card) {
        throw new ERROR_CODE_404('Карточка не найдена, проверьте корректность запроса.');
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ERROR_CODE_400('Отмена лайка не исполнена, проверьте корректность запроса.'));
      } else {
        next(err);
      }
    });
};
