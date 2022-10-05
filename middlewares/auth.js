const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const handleAuthError = (next) => {
  next(new UnauthorizedError('Необходима авторизация'));
};

const tokenVerify = (token) => {
  try {
    return jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return '';
  }
};

module.exports = (req, res, next) => {
  const token = req.cookies.jwt || req.headers.authorization.replace('Bearer ', '');
  if (!token) {
    return handleAuthError(next);
  }
  const payload = tokenVerify(token);
  if (!payload) {
    handleAuthError(next);
  }
  req.user = payload;
  return next();
};
