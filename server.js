/** 
LetsMeet v0.0.1 (Not even beta)
I'm starting this project on Wednesday 19 October 2016.
This is my first attempt
**/

/* ================= Modules ================= */

var express			= require('express');
var app				= express();
var morgan			= require('morgan');
var mongoose		= require('mongoose');
var cookieParser	= require('cookie-parser');
var session			= require('express-session');
var bodyParser 		= require('body-parser');
var passport		= require('passport');
var flash			= require('connect-flash');
var configDatabase 	= require('./config/database')

/* ================= Port config ============= */

var port = process.env.PORT || 8080;

/* ================= Database connection (Set only 1) ===== */

//mongoose.connect(configDatabase.url); // <--- Local
//mongoose.connect(configDatabase.modulusUrl); // <-- Modulus

/* =========== Module Init =================== */

require('./config/passport')(passport);
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({
	secret: 'myOwnSecretThatNobodyKnpows', //I need to use a real secret here
	saveUninitialized: true,
	resave: true
}));
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.set('view engine', 'ejs');

/* ============== Routing ==================== */

require('./app/routes')(app, passport);

/* ============== Start the server =========== */
app.listen(port);
console.log('LetsMeet is alive and listening at port ' + port);


