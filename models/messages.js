const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const MessagesSchema = new Schema({
    title: {String, required: true, max: 100},
    message: {String, required: true, max: 300},
    time : { type : Date, default: Date.now },
})

User.plugin(passportLocalMongoose);


module.exports = mongoose.model('Messages', UserSchema);