var mongoose = require("mongoose");
var User = mongoose.model("User");
var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

var GOOGLE_APP_ID = "911092959606-214057sk9i9j2lv6f2tch46j5klj7dku.apps.googleusercontent.com";
var GOOGLE_APP_SECRET = "kyf81YOzj5zQPAeq6O9j3-Q1";

passport.use(new GoogleStrategy({
		clientID: GOOGLE_APP_ID,
		clientSecret: GOOGLE_APP_SECRET,
		callbackURL: "http://localhost:8000/auth/google/callback"
	},
	function(accessToken, refreshToken, profile, done) {
		User.findOne({ authId: profile.id }, function(err, user) {
			if(err) {
				return done(err);
			}

			if(!user) {
				user = new User({
					authId: profile.id,
					name: profile.displayName,
					provider: profile.provider,
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
