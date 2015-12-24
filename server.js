// Require the Express Module
var express = require("express"),
//middleware
    path = require("path"),
    mongoose = require('mongoose'),
    bodyParser = require("body-parser"),
    app = express();

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
//passport and strategies
var passport = require('passport');
var passportLocal = require('passport-local');
// middleware configuration
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({ secret: process.env.SESSION_SECRET || 'solegood',
                          resave: false,
                          saveUninitialized: false}));

//passport configuration
app.use(passport.initialize());
app.use(passport.session());
require('./server/config/mongoose.js');
var User = mongoose.model('User');
//teach passport how to verify username and credentials
passport.use(new passportLocal.Strategy(function(username, password, done){
  console.log('passport username received', username);
  console.log('passport password received', password);
  User.findOne({ username: username, password: password},
    function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user); //there is a record
    });
}));

//teach passport how to serialize and deserialize users
//passport will invoke this function for us
passport.serializeUser(function(user, done){
  console.log('serializing');
  done(null, user.id);
});
passport.deserializeUser(function(id, done){
  //give the id back when they come back
  //query database or cache here!
  console.log('deserializing');
  done(null, {id:  id, name: id});
});

app.post('/login', function(req, res, next){
  passport.authenticate('local', function(err, user, info){
    if(err){return next(err);}
    if(!user) {
      console.log('incorrect user pass combo!');
      return res.json({err: 'incorrect user pass!'});
    }
    req.logIn(user, function(err){
      if(err){ return next(err);}
      console.log('success');
      console.log(req.isAuthenticated());
      console.log(req.user);
      return res.json({data:user});
    });

  })(req,res,next);
})


// this line requires and runs the code from our routes.js file and passes it
//app so that we can attach our routing rules to our express application!
require('./server/config/routes.js')(app);

// set up a static file server that points to the "client" directory
app.use(express.static(path.join(__dirname, './client')));
app.listen(8000, function() {
  console.log('login and reg on: 8000');
});
