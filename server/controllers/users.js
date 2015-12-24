var mongoose = require('mongoose');
// var Question = mongoose.model('Question');
var User = mongoose.model('User');
module.exports = (function(){
  return{
    createUser: function(req, res){
      console.log('in users controller');
      console.log(req.body);
      var user = new User(req.body);
      user.save(function(err){
        if(err){
          res.json({err: err});
        } else {
          res.json(true);
        }
      })
    }
  }
})();
