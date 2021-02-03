// User model goes here
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 22
  },
  username: {
    type: String,
    minlength: 3,
    maxlength: 24,
    required: true,
    lowercase: true
  },
  passwordHash: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
