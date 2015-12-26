var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  username: String,
  password: String,
  authId: Number,
  name: String,
  provider: String,
  json_info: Object,
  created_at: {type: Date, default: Date.now}
})

var User = mongoose.model('User', UserSchema)
