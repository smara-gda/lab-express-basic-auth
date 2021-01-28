const routeGaurd = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    const error = new Error('AUTHENTICATION_REQUIRED');
    error.status = 401;
    next(error);
  }
};

module.exports = routeGaurd;
