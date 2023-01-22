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
  console.log(owner)
  console.log(name)
  console.log(req.body)
  Card.create({ name, link, owner })
    .then((card) => {
      console.log(card)
      if (!card) {
        throw new ERROR_CODE_400('Переданы некорректные данные при создании карточки.');
      }
      res.send({ data: card });
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
//   // User.findById(req.params.owner)
//   //   .then((user) => {
//   //     console.log(user)
//   //     // if (!user) {
//   //     //   throw new ERROR_CODE_400('Вы не можете удалять карточки, созданные другими пользователями');
//   //     // }
//   //     res.send({ data: user });
//   //   })
//   //   .catch(next);
//   console.log(req.params.owner)
//   if (req.params.owner === req.user._id) {
//     Card.findByIdAndRemove(req.params._id)
//       .then((card) => {
//         if (!card) {
//           throw new ERROR_CODE_404('Карточка с указанным _id не найдена.');
//         }
//         res.send({ data: card });
//       })
//       .catch(next);
//   }

  throw new ERROR_CODE_400('Вы не можете удалять карточки, созданные другими пользователями');
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
