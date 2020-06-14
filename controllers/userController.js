const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bycrypt = require("bcrypt");
const User = require("../models/user");
const validator = require('express-validator');
const { body } = require('express-validator');

//const { check, validationResult } = require("express-validator");
//const express = require('express');
//const expressValidator = ("express-validator");

//const { body,validationResult } = require('express-validator/check');
//const { sanitizeBody } = require('express-validator/filter');


exports.index = function (req, res) {
  res.render("index", { title: "Members-Only" });
};

exports.signup_form = function (req, res) {
  res.render("sign-up", { title: "Members-Only" });
};

exports.signup_form_create= [
    validator.check('password', "must be atleast 5 characters").isLength({ min: 5 }).escape(),
    validator.body('first_name', 'First Name is required').trim().isLength({min:1}).escape(),
    validator.body('last_name', 'Last Name is required').trim().isLength({min:1}).escape(),
    validator.check('username', "must be an e-mail").isEmail().escape(),
    
    //After validation & sanitzation
    (req,res, next) => {
        //capturing errors
        const errors=validator.validationResult(req)

        //create user with escaped & trimmed data
        const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.email,
            passport: req.body.password,
          });

          if (!errors.isEmpty()) {
              console.log(errors)
              res.redirect("/members/signup")
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


    }
]
/*
exports.signup_form_create = function (req, res, next) {
  body('first_name', 'Empty name').isLength({ min: 1 }), 
  const errors = validationResult(req);
 if(errors) {   console.log(errors)}
  
   
  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.email,
    passport: req.body.password,
  });
  console.log(user);
  user.save(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/members/signup");
  });
};

/*
    check('username').isEmail(),
    check('password').isLength({ min: 5 }),
 
    function (req, res, next) {
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
  }
  */

/*
exports.signup_form_create = [
    
    check('username').isEmail(),
    check('password').isLength({ min: 5 }),
 
    function (req, res, next) {
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
  }



]
*/
