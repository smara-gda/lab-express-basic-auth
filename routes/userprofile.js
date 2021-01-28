const express = require('express');

const User = require('../models/user');
const router = new express.Router();

router.get('/profile', (req, res, next) => {
  if (req.user) {
    const user = req.user;

    res.render('profile', { user });
  } else {
    next(new Error('User is not authenticated'));
  }
});

module.exports = router;
