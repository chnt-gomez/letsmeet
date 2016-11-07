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

mongoose.connect(configDatabase.url, function(err){
	if(err){
		console.log(err);
		console.log('Cannot connect to the database');
	}
}); // 				

mongoose.connection.on('connected', function(){
	console.log('The connection for the database is ready');
})

mongoose.connection.on('error', function(){
	console.log('An error happened with the database');
})

mongoose.connection.on('disconected', function(){
	console.log('Database disconected');
})

/* =========== Module Init =================== */

require('./config/passport')(passport);
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
	secret: 'myOwnSecretThatNobodyKnows', //I need to use a real secret here
	saveUninitialized: true,
	resave: true
}));
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(passport.session());		
app.use(flash());

/* ============== Routing ==================== */

require('./app/routes')(app, passport);

/* ============== Start the server =========== */
app.listen(port);

console.log('LetsMeet is alive and listening at port ' + port);


