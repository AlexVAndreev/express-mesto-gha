const User = require('../models/user');
const { INPUT_ERROR, NOT_FOUND_ERROR, DEFAULT_ERROR } = require('../utils/const');

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error('Пользователь не найден');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(NOT_FOUND_ERROR).send({ message: err.message });
      } else if (err.name === 'CastError') {
        res.status(INPUT_ERROR).send({ message: 'Переданы некорректный _id пользователя' });
      } else res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => {
      res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' });
    });
};
module.exports.postUsers = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
  // вернём записанные в базу данные
    .then((user) => res.send({ data: user }))
  // данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INPUT_ERROR).send({ message: 'Ошибка' });
      } else res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' });
    });
};
module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .orFail(() => {
      const error = new Error('Пользователь не найден');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь не найден' });
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(INPUT_ERROR).send({ message: 'некорректные данные при обновлении профиля' });
      } else res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .orFail(() => {
      const error = new Error('Пользователь не найден');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(NOT_FOUND_ERROR).send({ message: err.message });
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(INPUT_ERROR).send({ message: 'некорректные данные при обновлении профиля' });
      } else res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' });
    });
};
