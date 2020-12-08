const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("./../models/user.model");

// HELPER FUNCTIONS
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLogin,
} = require("./../helpers/middlewares");

// POST '/auth/signup'

router.post("/signup", isNotLoggedIn, validationLogin, (req, res, next) => {
  // the validation will happen in the middlewares, dependeing on your user model
  const { username, password } = req.body;

  User.findOne({ username })
    .then((foundUser) => {
      if (foundUser) {
        //If username is already taken, then return error response
        return next(createError(400)); //Bad request
      } else {
        // If username is available, go and create a new user
        const salt = bcrypt.genSaltSync(saltRounds);
        const encryptedPassword = bcrypt.hashSync(password, salt);

        User.create({ username, password: encryptedPassword })
          .then((createdUser) => {
            createdUser.password = "*";
            req.session.currentUser = createdUser;

            res.status(201).json(createdUser);
          })
          .catch((err) => {
            next(createError(err));
          });
      }
    })
    .catch((err) => {
      next(createError(err));
    });
});
//  - check that user is NOT logged in - using middleware (check if `req.session.currentUser` is set)
//  - check that `password` and the `username` are sent in the req.body - using middleware
//  - check if the `username` is already taken, if it is send an error response - forward the error to the error middleware using `next()`
//  - if `username` is unique (not taken) then:
//     - encrypt the password using bcrypt
//     - create the new user in DB using the `username` and the encrypted password
//     - set the `req.session` using newly created user object, to trigger creation of the session
//     - send json response (new user object) with the status code 201 (Created).

// POST '/auth/login'
router.post("/login", isNotLoggedIn, validationLogin, (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return next(createError(404));
      }

      const passwordIsValid = bcrypt.compareSync(password, user.password);

      if (passwordIsValid) {
        //set the 'req.session.currentuser', to trigger creation of the session
        user.password = "*";
        req.session.currentUser = user;

        //respond back
        res.status(200).json(user);
      } else {
        next(createError(401));
      }
    })
    .catch((err) => {
      next(createError(err));
    });
});

//  - check that user is NOT logged in - using middleware (check if `req.session.currentUser` is set)
//  - check that `password` and the `username` are sent in the req.body - using middleware
//  - check if user with the same `username` exists in the DB
//  - if user doesn't exist send an error response - forward the error to the error middleware using `next()`
//  - if user exists - set the `req.session`, to trigger creation of the session
//  - send json response with the status code 200 (OK)

// POST '/auth/logout'

router.get("/logout", isLoggedIn, (req, res, next) => {
  req.session.destroy(function (err) {
    if (err) {
      return next(err);
    }

    res
      .status(204) // no content
      .send();
  });
});
//  - check if the user is logged in using middleware (check if `req.session.currentUser` is set)
//  - destroy the session
//  - set status code 204 (No Content) and send the response back

// GET '/auth/private'   --> Same as /me but it returns a message instead (Example only, no real use)
//  - check if the user IS logged in using middleware (check if `req.session.currentUser` is set)
//  - set status code and send the json message response back

// GET '/auth/me'
router.get("/me", isLoggedIn, (req, res, next) => {
  const currentUserSessionData = req.session.currentUser;

  res
    .status(200) //all good
    .json(currentUserSessionData);
});
//  - check if the user Is logged in using middleware (check if `req.session.currentUser` is set)
//  - if yes, send the response with user info (available on `req.session.currentUser`)

module.exports = router;
