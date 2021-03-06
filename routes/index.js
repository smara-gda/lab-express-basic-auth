const express = require('express');
const routeGuard = require('./../middleware/routeGaurd');
const router = new express.Router();
const User = require('./../models/user');

// router.get('/', (req, res, next) => {
//   res.render('index');
// });

router.get('/', (req, res, next) => {
  User.find()
    .then((users) => {
      console.log(users);
      res.render('index', { users });
    })
    .catch((error) => {
      next(error);
    });
});

// GET /main - Add a funny picture of a cat and a link back to the home page

router.get('/main', (req, res, next) => {
  res.render('main');
});
// GET /private - Add your favorite gif and an <h1> denoting the page as private.
router.get('/private', routeGuard, (req, res, next) => {
  res.render('private');
});
module.exports = router;
