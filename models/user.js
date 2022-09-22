const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 2,
      maxLength: 30,
      default: 'Alex',
    },
    about: {
      type: String,
      minLength: 2,
      maxLength: 30,
      default: 'Sewi',
    },
    avatar: {
      type: String,
      required: true,
    },
  },
);
module.exports = mongoose.model('User', userSchema);
