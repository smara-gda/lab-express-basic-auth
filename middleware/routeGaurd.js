const routeGuard = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/authentication/log-in');
  }
};

module.exports = routeGuard;
