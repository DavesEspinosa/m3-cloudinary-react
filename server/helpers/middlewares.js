//it creates an error object
const createError = require("http-errors");

exports.isLoggedIn = (req, res, next) => {
  //Check if the user request has a cookie/session
  if (req.session.currentUser) next();
  else next(createError(401));
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) next();
  else next(createError(403));
};

exports.validationLogin = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) next(createError(400));
  else next();
};


//above exporting is same as what we did before:
/* exports = {
  isLoggedIn,
  isNotLoggedIn,
  validationLogin,
} */