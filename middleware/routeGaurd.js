const routeGaurd = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/authentication/log-in');
  }
};

module.exports = routeGaurd;
