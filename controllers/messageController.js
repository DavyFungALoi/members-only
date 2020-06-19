const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("../models/user");
const Messages = require("../models/messages");
const async = require("async");
const validator = require("express-validator");
const { body } = require("express-validator");

exports.message_form_display = function (req, res) {
  res.render("message_create", { title: "Members-Creation", user: req.user, errors: "" });
};

exports.message_create_post = [
  validator
    .check("title", "Title must be atleast 3")
    .isLength({ min: 3 })
    .escape(),
  validator
    .body("message", "Message Input is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    const errors = validator.validationResult(req);
    const message = new Messages({
      title: req.body.title,
      message: req.body.message,
      author: res.locals.currentUser,
    });
    if (!errors.isEmpty()) {
      console.log(errors);
      res.render("message_create", {
        title: "Members create",
        user: req.user,
        errors: errors.array(),
      });
      return;
    } else {
      message.save(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect("/members/memberlist");
        return;
      });
    }
  },
];
/*
exports.message_create_post = [
    body('title', 'Title must not be empty')
      .trim()
      .isLength({ min: 1 }),
    body('message', 'Message must not be empty')
      .trim()
      .isLength({ min: 1 }),
  
    sanitizeBody('title').escape(),
    sanitizeBody('message').escape(),
  
    (req, res, next) => {
      const errors = validationResult(req)
  
      const message = new Messages({
        title: req.body.title,
        text: req.body.message,
        author: res.locals.currentUser
      })
  
      if (!errors.isEmpty()) {
        res.render('message_form', {
          title: 'Create New Message',
          info: message,
          errors: errors.array()
        })
        return
      } else {
        message.save(err => {
          if (err) return next(err)
  
          res.redirect('/messages')
        })
      }
    }
  ]

  */
/*
exports.message_form_create = function (req, res, next) {
  const messagepush = new Messages({
    title: 'hello',
    message: "there",
    author: res.locals.currentUser
  });

  
  console.log(messagepush);
  User.findByIdAndUpdate.populate('messages')(req.params.id, { $push: { messages: messagepush } }, function (
    err
  ) {
    if (err) {
      return next(err);
    }
    else {
        res.send(messagepush);
    }
  });

};

*/

///, { $push: { messages: messagepush } }
/*
  exports.membership_detail_page_membership_status_request = function (
    req,
    res,
    next
  ) {
    if (req.body.secret_password.toLowerCase() === "alohomora") {
      User.findByIdAndUpdate(
        req.params.id,
        { membership_status: true },
        function (err) {
          if (err) {
            return next(err);
          }
        }
      );
      res.redirect("/members/memberlist");
    } else {
      res.send("invalid password");
    }
  };
  */

/*
  exports.signup_form_create = [
    validator
      .check("password", "Password must be atleast 5 characters")
      .isLength({ min: 5 })
      .escape(),
    validator
      .body("first_name", "First Name is required")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    validator
      .body("last_name", "Last Name is required")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    validator.check("username", "must be an e-mail").isEmail().escape(),
    validator.check("password").exists(),
    validator
      .check(
        "passwordConfirmation",
        "Your Password has to be the same in both fields"
      )
      .exists()
      .custom((value, { req }) => value === req.body.password),
  
    //After validation & sanitzation
    (req, res, next) => {
      //capturing errors
      const errors = validator.validationResult(req);
  
      //create user with escaped & trimmed data
  
      //bcrypt it
      bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        const user = new User({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          username: req.body.username,
          password: hash,
        });
  
        if (!errors.isEmpty()) {
          console.log(errors);
          res.render("sign-up", {
            title: "Members Genre",
            errors: errors.array(),
          });
          return;
        } else {
          console.log(user);
          user.save(function (err) {
            if (err) {
              return next(err);
            }
            res.redirect("/members/memberlist");
            return;
          });
        }
      });
    },
  ];
  */
