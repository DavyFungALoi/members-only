const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  first_name: { type: String, required: true},
  last_name:  { type: String, required: true},
  username:  { type: String},
  passport: {type: String},
  messages: [{ type: Schema.Types.ObjectId, ref: "Messages" }],
  membership_status:{type: Boolean, default:false}

});


module.exports = mongoose.model("User", UserSchema);
