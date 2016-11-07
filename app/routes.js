/* ========== Routings ======================= */

module.exports = function (app, passport){

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/me',
		failureRedirect : '/loginerr',
		failureFlash: true
	}));

	/*===== SECURE ==== */

	app.get('/me', isLoggedIn,  function(req, res, next){
		res.end('Welcome user');
	});

	/* ========== Errors ====================== */

	app.get('/loginerr', function(req, res, next){
		res.json({'error' : req.flash('signupMessage')});
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