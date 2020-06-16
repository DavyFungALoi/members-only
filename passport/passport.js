const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = function(passport, LocalStrategy){
    passport.use(
        new LocalStrategy((username, password, done) => {
          User.findOne({ username: username }, (err, user) => {
            if (err) { 
              return done(err);
            };
            if (!user) {
              return done(null, false, { msg: "Incorrect username" });
            }
            if (user.password !== password) {
              return done(null, false, { msg: "Incorrect password" });
            }
            return done(null, user);
          });
        })
      );

};


passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });


passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
