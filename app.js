const dotenv = require('dotenv').config({path: 'process.env'})
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressValidator = ("express-validator");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var membersOnlyRouter = require('./routes/members'); 
var mongoose = require('mongoose');
const bcrypt = require("bcrypt");


//user

const User = require('./models/user')
///passportJs

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;


var app = express();

//More PassportJS

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


//Validator

//Set up default mongoose connection
var mongoDB = process.env.DB_CONNECT
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/members', membersOnlyRouter)

//login functionality

passport.use(
  new LocalStrategy((username, password, done) => {
    console.log("im being used")
    User.findOne({ username: username }, (err, user) => {
      console.log(user)
      if (err) { 
        console.log(err)
        return done(err);
      };
      if (!user) {
        console.log("user not found")
        return done(null, false, { msg: "Incorrect username" });
        
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // passwords match! log user in
          console.log('hello')
          return done(null, user);
        } else {
          console.log('nice try')
          return done(null, false, { msg: "Incorrect password" });
        }
      });
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.post(
  "/members/signin",
  passport.authenticate("local", {
    successRedirect: "/members/signin",
    failureRedirect: "/members/signup"
  })
  
);

app.get("/members/log-out", (req, res) => {
  req.logout();
  res.redirect("/members");
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
