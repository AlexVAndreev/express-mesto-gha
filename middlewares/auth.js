const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/UnauthorizedError');

require('dotenv').config();

const { JWT_SECRET = 'JWT_SECRET' } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new Unauthorized('Необходима авторизация'));
    return;
  }
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new Unauthorized('Необходима авторизация'));
    return;
  }
  req.user = payload;
  next();
};
