const express = require('express');
const routeGuard = require('./../middleware/routeGaurd');
const User = require('./../models/user');
const router = new express.Router();

const bcryptjs = require('bcryptjs');

router.get('/sign-up', (req, res, next) => {
  res.render('signup');
});

router.post('/sign-up', (req, res, next) => {
  const data = req.body;
  console.log(data);

  User.findOne({
    username: data.username
  })
    .then((user) => {
      if (user) {
        throw new Error('There is already an account with this username');
      } else {
        return bcryptjs.hash(data.password, 10);
      }
    })
    .then((passwordHash) => {
      return User.create({
        username: data.username,
        passwordHash: passwordHash
      });
    })
    .then((user) => {
      req.session.userId = req._id;
      res.redirect('/profile');
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/log-in', (req, res, next) => {
  res.render('login');
});

router.post('/log-in', (req, res, next) => {
  const data = req.body;
  let user;
  User.findOne({
    username: data.username
  })
    .then((doc) => {
      user = doc;
      if (user) {
        return bcryptjs.compare(data.password, user.passwordHash);
      } else {
        throw new Error('There is no user profile with that username');
      }
    })
    .then((result) => {
      console.log(user);
      if (result) {
        req.session.userId = user._id;
        // console.log(req.session.userId);
        res.redirect('/profile');
      } else {
        throw new Error('The password doesnt match');
      }
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
