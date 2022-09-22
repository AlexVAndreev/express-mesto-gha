const Card = require('../models/card');
const { INPUT_ERROR, NOT_FOUND_ERROR, DEFAULT_ERROR } = require('../utils/const');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => {
      res.status(DEFAULT_ERROR).send({ message: 'Ошибка на сервер' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INPUT_ERROR).send({ message: 'Переданы некорректные данные' });
      } else res.status(DEFAULT_ERROR).send({ message: 'Ошибка насервере' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(NOT_FOUND_ERROR).send({ message: err.message });
      } else if (err.name === 'CastError') {
        res.status(INPUT_ERROR).send({ message: 'Ошибка _id карточки' });
      } else res.status(NOT_FOUND_ERROR).send({ message: err.message });
    });
};
module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
).orFail(() => {
  const error = new Error('Передан несуществующий _id карточки');
  error.statusCode = 404;
  throw error;
}).then((card) => res.send({ data: card }))
  .catch((err) => {
    if (err.statusCode === 404) {
      res.status(NOT_FOUND_ERROR).send({ message: err.message });
    } else if (err.name === 'ValidationError' || err.name === 'CastError') {
      res.status(INPUT_ERROR).send({ message: 'Проблемы с Лайком' });
    } else res.status(DEFAULT_ERROR).send({ message: 'Ошибка на стороне сервера' });
  });

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
).orFail(() => {
  const error = new Error('Передан несуществующий _id карточки');
  error.statusCode = 404;
  throw error;
}).then((card) => res.send({ data: card }))
  .catch((err) => {
    if (err.statusCode === 404) {
      res.status(NOT_FOUND_ERROR).send({ message: err.message });
    } else if (err.name === 'ValidationError' || err.name === 'CastError') {
      res.status(INPUT_ERROR).send({ message: 'Проблемы с Лайком' });
    } else res.status(DEFAULT_ERROR).send({ message: 'Ошибка на стороне сервера' });
  });
