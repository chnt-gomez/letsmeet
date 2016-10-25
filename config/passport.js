var FacebookStrategy = require('passport-facebook').Strategy;
var facebookAuth = require('./facebook');
var User = require ('../app/models/user');

module.exports = function(passport){

	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, done){
			done(err, user)
		});
	});


	/*=========== Facebook Authentication ===========*/

	passport.use(new FacebookStrategy({
	    clientID: facebookAuth.clientId,
	    clientSecret: facebookAuth.secret,
	    callbackURL: facebookAuth.callbackUrl
	  },
	  function(accessToken, refreshToken, profile, done) {
	    	process.nextTick(function(){
	    		User.findOne({'facebook.id': profile.id}, function(err, user){
	    			if(err)
	    				return done(err);
	    			if(user)
	    				return done(null, user);
	    			else {
	    				var newUser = new User();
	    				newUser.facebook.id = profile.id;
	    				newUser.facebook.token = accessToken;
	    				newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
	    				newUser.facebook.email = profile.emails[0].value;

	    				newUser.save(function(err){
	    					if(err)
	    						throw err;
	    					return done(null, newUser);
	    				})
	    				console.log(profile);
	    			}
	    		});
	    	});
	    }

	));
}