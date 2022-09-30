const router = require('express').Router();

const {
  getUsers,
  getUser,
  postUsers,
  updateProfile,
  updateAvatar,
  login,

} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);
router.post('/signin', login);
router.post('/signup', postUsers);

module.exports = router;
