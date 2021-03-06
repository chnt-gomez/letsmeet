var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var facebookAuth = require('./facebook');
var googleAuth = require('./google');
var User = require ('../app/models/user');

module.exports = function(passport){

	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user)
		});
	});


	/*=========== Local Authentication ==============*/

	/* Signup */

	passport.use('signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	}, function(req, email, password, next){
		process.nextTick(function(){
			User.findOne ({'local.email' : alias}, function(err, user, info){
				if (err)
					return next(err);
				if(user)
					return next(null, false);
				if(user && info){
					var newUser = new User();
					newUser.local.email = email;
					newUser.local.password = password;
					newUser.local.alias = req.params.alias;	
					newUser.save(function(err){
					if(err)
						return next(err)
					res.send('User saved');
					});
				}
			});
		});
	}));



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
	    				//newUser.facebook.email = profile.emails[0].value;
	    				newUser.save(function(err){
	    					if(err)
	    						throw err;
	    					return done(null, newUser);
	    				});
	    				console.log(profile);
	    			}
	    		});
	    	});
	    }
	));

	/*=========== Google Authentication ===========*/

	passport.use(new GoogleStrategy({
	    consumerKey: googleAuth.consumerKey,
	    consumerSecret: googleAuth.consumerSecret,
	    callbackURL: googleAuth.callbackUrl
	  },
	  function(accessToken, refreshToken, profile, done) {
	    	process.nextTick(function(){
	    		User.findOne({'google.id': profile.id}, function(err, user){
	    			if(err)
	    				return done(err);
	    			if(user)
	    				return done(null, user);
	    			else {
	    				var newUser = new User();
	    				newUser.google.id = profile.id;
	    				newUser.google.token = accessToken;
	    				newUser.google.name = profile.displayName;
	    				//newUser.google.email = profile.emails[0].value;
	    				newUser.save(function(err){
	    					if(err)
	    						throw err;
	    					return done(null, newUser);
	    				});
	    				console.log(profile);
	    			}
	    		});
	    	});
	    }
	));
}