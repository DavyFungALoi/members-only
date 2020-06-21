const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: true, max: 100 },
  message: { type: String, required: true, max: 300 },
  time: { type: Date, default: Date.now },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true }

});
MessageSchema
.virtual('url')
.get(function () {
    return '/message/' +this._id
  
});

module.exports = mongoose.model('Messages', MessageSchema);
