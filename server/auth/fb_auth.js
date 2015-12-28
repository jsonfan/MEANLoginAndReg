var mongoose = require("mongoose");
var User = mongoose.model("User");
var passport = require("passport");
var FacebookStrategy = require("passport-facebook").Strategy;

var FACEBOOK_APP_ID = "1545771882410304";
var FACEBOOK_APP_SECRET = "143096a9f6d9086ae890b7df30861e72";
passport.use(new FacebookStrategy({
		clientID: FACEBOOK_APP_ID,
		clientSecret: FACEBOOK_APP_SECRET,
		callbackURL: "/auth/facebook/callback"
	},
	function(accessToken, refreshToken, profile, done) {
			console.log('fbauth');
		User.findOne({ authId: profile.id }, function(err, user) {
			if(err) {
				return done(err);
			}

			if(!user) {
				user = new User({
					authId: profile.id,
					username: profile._json.id, //should change this later
					name: profile.displayName,
					provider: profile.provider,
					pictureURL: 'https://graph.facebook.com/'+profile._json.id+'/picture?type=large',
					json_info: profile._json
				});
				user.save(function(err) {
					if(err) {
						console.log(err)
					}
					return done(err, user);
				});
			} else {
				return done(err, user);
			}
		})
	}
));
