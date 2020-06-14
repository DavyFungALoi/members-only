const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/user");
const validator = require('express-validator');
const { body } = require('express-validator');

exports.index = function (req, res) {
  res.render("index", { title: "Members-Only" });
};

exports.signup_form = function (req, res) {
  res.render("sign-up", { title: "Members-Only", errors: ""});
};


/*
app.post("/sign-up", (req, res, next) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    const user = new User({
      username: req.body.username,
      password: hash,
    }).save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });
});

*/

exports.signup_form_create= [
    validator.check('password', "Password must be atleast 5 characters").isLength({ min: 5 }).escape(),
    validator.body('first_name', 'First Name is required').trim().isLength({min:1}).escape(),
    validator.body('last_name', 'Last Name is required').trim().isLength({min:1}).escape(),
    validator.check('username', "must be an e-mail").isEmail().escape(),
    validator.check('password').exists(),
    validator.check('passwordConfirmation', 'Your Password has to be the same in both fields')
      .exists()
      .custom((value, { req }) => value === req.body.password),
    
    //After validation & sanitzation
    (req,res, next) => {
        //capturing errors
        const errors=validator.validationResult(req)

        //create user with escaped & trimmed data

        //bcrypt it
        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.email,
            passport: hash,
          });

          if (!errors.isEmpty()) {
              console.log(errors)
              res.render('sign-up', { title: 'Members Genre', errors: errors.array()});
              return
          }
          else {
            console.log(user)
            user.save(function (err) {
                if (err) {
                  return next(err);
                }
                res.redirect("/members/signup")
                return;
              });

          }

        })
    }
]
