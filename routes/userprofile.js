const express = require('express');
const routeGaurd = require('./../middleware/routeGaurd');
const User = require('../models/user');
const router = new express.Router();
const bcryptjs = require('bcryptjs');

router.get('/profile', (req, res, next) => {
  if (req.user) {
    const user = req.user;

    res.render('profile', { user });
  } else {
    next(new Error('User is not authenticated'));
  }
});

// Router to handle editing profile requests
router.get('/edit/:id/profile', routeGaurd, (req, res, next) => {
  const id = req.params.id;
  User.findById(id)
    .then((user) => {
      res.render('profile-edit', { user });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/edit/:id/profile', routeGaurd, (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  User.findByIdAndUpdate(id, {
    name: data.name,
    username: data.username,
    passwordHash: data.passwordHash
  }).then((result) => {
    res.redirect('/profile');
  });
});

router.get('/log-out', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
