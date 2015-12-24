var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  username: String,
  password: String,
  created_at: {type: Date, default: Date.now}
})

var User = mongoose.model('User', UserSchema)
