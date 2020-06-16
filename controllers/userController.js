const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/user");
const validator = require("express-validator");
const { body } = require("express-validator");
const async = require("async");
const LocalStrategy = require("passport-local").Strategy;

exports.index = function (req, res) {
  res.render("index", { title: "Members-Only" });
};

exports.members_list_display = function (req, res, next) {
  User.find({}, "first_name last_name").exec(function (err, list_users) {
    if (err) {
      return next(err);
    }
    res.render("member_list", {
      title: "Members-Only",
      users_list: list_users,
    });
  });
};

exports.signup_form = function (req, res) {
  res.render("sign-up", { title: "Members-Only", errors: "" });
};

//create a new user

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

//create a membership password display thing where if you do it correctly it will update your status
exports.membership_detail_page = function (req, res, next) {
  async.parallel(
    {
      user_found: function (callback) {
        User.findById(req.params.id).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if ((results.user = null)) {
        console.log("user not found");
        return next(err);
      }
      res.render("user_detail", {
        title: "Personal Profile",
        user: results.user_found,
      });
    }
  );
};

//Grant a member membership status if they fill in the correct passport

exports.membership_form = function (req, res) {
  res.render("membership", { title: "Members-Only" });
};

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

exports.sign_in_display = function (req, res) {
  res.render("sign-in", { title: "Members-Only", user: req.user  });
};

