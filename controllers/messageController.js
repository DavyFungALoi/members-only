const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("../models/user");
const Messages = require("../models/messages");
const async = require("async");
const validator = require("express-validator");
const { body } = require("express-validator");

exports.message_form_display = function (req, res) {
  res.render("message_create", {
    title: "Members-Creation",
    user: req.user,
    errors: "",
  });
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

exports.index_messages = function (req, res, next) {
  Messages.find({}, "title message time")
    .populate("author")
    .exec(function (err, list_messages) {
      if (err) {
        return next(err);
      }
      res.render("message_list", {
        title: "Members-Only",
        messages_list: list_messages,
        user: req.user,
      });
    });
};

exports.messages_detail_page = function (req, res, next) {
  async.parallel(
    {
      message_found: function (callback) {
        Messages.findById(req.params.id).populate("author").exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if ((results.message = null)) {
        console.log("message not found");
        return next(err);
      }
      res.render("message_detail", {
        title: "Message Profile",
        message: results.message_found,
        user: req.user,
      });
    }
  );
};

exports.delete_message = function (req, res, next) {
  console.log("delete this")
  console.log(req.params.id)
  Messages.findByIdAndRemove(req.params.id,
    function errortest(err) {
      if (err) {
        return next(err);
      } else {
        res.redirect("/members/message/messagelist");
      }
    })
};
