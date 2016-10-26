/* ========== Routings ======================= */

module.exports = function (app, passport){
	app.get('/', function (req, res){
		res.render('../app/views/index',{
			loginMessage : req.flash('loginMessage'),
			signupMessage: req.flash('signupMessage')	
		});
	});


	app.get('/profile', isLoggedIn, function(req, res){
			res.writeHead(200, {'Content-Type':'application/json'});
			var profileJson = {user: req.user.id};
			var json = JSON.stringify({
				anObject : profileJson
			});
		res.end(json);
	});

	app.get('/auth/facebook', passport.authenticate('facebook', {scope : ['email']}));

	app.get('/auth/facebook/callback', 
		passport.authenticate('facebook', {
			successRedirect : '/profile',
		 	failureRedirect : '/'}));

	/* ========== Is LoggedIn function ======== */

	function isLoggedIn(req, res, next){
		if (req.isAuthenticated()){
			return next();
		}
		res.redirect('/auth/facebook');
	}
}