const mongoose = require("mongoose");
const Schema = mongoose.Schema
const bycrypt=require('bcrypt')
const User = require("../models/user")
const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator")

exports.index = function (req, res) {
  res.render("index", { title: "Members-Only" });
};

exports.signup_form = function (req, res) {
  res.render("sign-up", { title: "Members-Only" });
};

exports.signup_form_create = function (req, res, next) {
    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.email,
        passport: req.body.password,
      });
        console.log(user)
        user.save(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect("/members/signup");
      });
      
      console.log(req.body);
  };