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

	passport.use('local-signup', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	},
	function(req, email, password, done){
		console.log('authenticating...');
		process.nextTick(function(){
			User.findOne({'email' : email}, function(err, user){
				if(err){
					console.log(err);
					return done(err);
				}
				if(user){
					console.log(user.id);
					return done(null, false, req.flash('signupMessage', 'That e-mail is already taken'))
				}else{
					cosole.log('Ps aqui creando al usuario, casual');
					var newUser = new User();
					newUser.email = email;
					newUser.passport = newUser.encryptPassword(password);
					newUser.save(function(err){
						if(err)
						console.log(err);
							throw err;
						return done(null, newUser);
					});
				}
			});
		});
	}));

	/*=========== Local Authentication ==============*/
};