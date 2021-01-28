const User = require('../models/user');

const deserializeUser = (req, res, next) => {
  if (req.session.userId) {
    User.findById(req.session.userId)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((error) => {
        next(error);
      });
  }
};
module.exports = deserializeUser;
