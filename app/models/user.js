var mongoose = require('mongoose');
var UserSchema = mongoose.Schema({
	local:{
		id: String,
		alias: String,
		email: String
	},
	facebook:{
		id: String,
		name: String,
		email: String,
		token: String
	}
});

module.exports = mongoose.model('userModel', UserSchema);