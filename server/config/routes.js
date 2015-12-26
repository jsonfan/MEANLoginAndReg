var users = require('../controllers/users');
var passport = require('passport');
module.exports = function(app) {
  app.post('/users', users.createUser);
  //OAUTH routes
  app.get("/auth/facebook", passport.authenticate("facebook"));
	app.get("/auth/facebook/callback",
    passport.authenticate("facebook",
      { failureRedirect: "/" }),
        function(req, res) {
  	       res.render("success", { user: req.session.passport.user });
  });
  app.get("/auth/google",
        passport.authenticate("google",
          { scope: ["https://www.googleapis.com/auth/plus.login",
                    'https://www.googleapis.com/auth/userinfo.email']
  }));
  app.get("/auth/google/callback",
    passport.authenticate("google",
      { failureRedirect: "/" }),
        function(req, res) {
  	       res.render("success", { user: req.session.passport.user });
  });
  //local auth route
  app.post('/login', function(req, res, next){
    passport.authenticate('local', function(err, user, info){
      if(err){return next(err);}
      if(!user) {
        console.log('incorrect user pass combo!');
        return res.json({err: 'Invalid username and/or password combination!'});
      }
      req.logIn(user, function(err){
        if(err){ return next(err);}
        console.log('success');
        console.log(req.isAuthenticated());
        console.log(req.user);
        console.log('req session:', req.session);
        return res.json({data:user});
      });
    })(req,res,next);
  });
};
