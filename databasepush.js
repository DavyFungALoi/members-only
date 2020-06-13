#! /usr/bin/env node

console.log(
    "This script populates some test keyboards to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true"
  );
  
  // Get arguments passed on command line
  var userArgs = process.argv.slice(2);

  var async = require("async");
  const User = require("./models/user");
  const Message = require("./models/messages");  
  var mongoose = require("mongoose");
  var mongoDB = userArgs[0];
  mongoose.connect(mongoDB, { useNewUrlParser: true });
  mongoose.Promise = global.Promise;
  var db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  
  let Users = [];
  let Messages = [];
  let messagesexample= ["hello there", "general kenobi"]


  function userCreate(first_name, last_name, username, passport, messages, membershipstatus) {
      userdetail= {
          first_name: first_name,
          last_name: last_name,
          username: username,
          passport,
          messages,
          membershipstatus,
          cb
      }
      const user = new User(userdetail)
      user.save(function(err){
          if (err) {
              cb(err, null)
              return
          }
          Users.push(user)
      } )
  }


  
  
  function createUSers(cb) {
    async.parallel(
      [
        function (callback) {
          userCreate(
            "Kip",
            "Sate",
            "kip@gmail.com",
            "krappa",
            messagesexample[1], messagesexample[2],
            "2",
            callback
          );
        },
      ],
      // optional callback
      cb
    );
  } 
  async.series(
    [createUsers],
    // Optional callback
    function (err, results) {
      if (err) {
        console.log("FINAL ERR: " + err);
      } else {
        console.log("The array is as following: " + Keyboards);
      }
      // All done, disconnect from database
      console.log(Users)
      mongoose.connection.close();
    }
  );
  