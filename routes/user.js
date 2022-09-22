const router = require('express').Router();

const {
  getUsers,
  getUser,
  postUsers,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', postUsers);

module.exports = router;
