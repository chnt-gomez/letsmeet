var mongoose = require('mongoose');
var UserSchema = mongoose.Schema({
	local:{
		alias: String,
		email: String,
		password : String
	},
	facebook:{
		id: String,
		name: String,
		email: String,
		token: String
	},
	google:{
		id: String,
		name: String,
		email: String,
		token: String,
	}
});

module.exports = mongoose.model('userModel', UserSchema);