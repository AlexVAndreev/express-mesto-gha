const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/UnauthorizedError');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new Unauthorized('Необходима авторизация'));
    return;
  }
  let payload;

  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    next(new Unauthorized('Необходима авторизация'));
  }
  req.user = payload;
  next();
};
