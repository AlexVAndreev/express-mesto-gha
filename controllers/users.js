const User = require('../models/user');

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        console.log('Пользователя тю-тю');
      }
      return res.send(user);
    })
    .catch((err) => err.status);
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => err.status);
};
module.exports.postUsers = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
  // вернём записанные в базу данные
    .then((user) => res.send({ data: user }))
  // данные не записались, вернём ошибку
    .catch((err) => err.status);
};
module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => res.send({
      _id: user._id,
      avatar: user.avatar,
      name,
      about,
    }))
    .catch((err) => err.status);
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => res.send({
      _id: user._id,
      avatar,
      name: user.name,
      about: user.about,
    }))
    .catch((err) => err.status);
};
