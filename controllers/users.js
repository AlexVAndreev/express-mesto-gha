const User = require('../models/user');

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        console.log('Пользователя тю-тю');
      }
      return res.send(user);
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};
module.exports.postUsers = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
  // вернём записанные в базу данные
    .then((user) => res.send({ data: user }))
  // данные не записались, вернём ошибку
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err.message}` }));
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
    .catch(console.log('pew pew trouble updateProfile'));
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
    .catch(console.log('pew pew trouble updateAvatar'));
};
