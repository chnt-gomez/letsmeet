/* ========== Routings ======================= */
var User = require ('../app/models/user');

module.exports = function (app, passport){

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/me',
		failureRedirect : '/loginerr',
		failureFlash: true
	}));

	app.get('/api/test', function(req, res){
		res.json({'message' : 'this will be a very big call to see if there is a way to test all server'});
	})

	/*===== SECURE ==== */

	app.get('/me', isLoggedIn,  function(req, res, next){
		res.end('Welcome user');
	});

	/* ========== Errors ====================== */

	app.get('/loginerr', function(req, res, next){4
		var message = req.flash('signupMessage');
		
		res.json({'error' : message[0]});
	});

	app.get('/unauthorized', function(req, res, next){
		res.json({'error' : 'not authorized'});
	});

	/* ========== Is LoggedIn function ======== */

	function isLoggedIn(req, res, next){
		if (req.isAuthenticated()){
			return next();
		}
		res.redirect('/unauthorized');
	}
}