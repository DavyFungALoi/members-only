const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    first_name: {String, required: true, max: 100},
    last_name: {String, required: true, max: 100},
    username: mongoose.SchemaTypes.Email,
    passport: String,
    messages:[{ type: Schema.Types.ObjectId, ref: 'Messages' }].
    membershipstatus[{ type: Schema.Types.ObjectId, ref: 'Membership' }]


})

User.plugin(passportLocalMongoose);


module.exports = mongoose.model('User', UserSchema);