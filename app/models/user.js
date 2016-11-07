var mongoose = require('mongoose');
var bcrypt = require ('bcrypt-nodejs');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
	email: {type : String, required : true}, 
	password : {type :String, required : true}
});

var LocalUserSchema = mongoose.Schema();

LocalUserSchema.methods.encryptPassword = function(password){
	return bcrypt.hashSync(password, bcrypt.generateSaltSync(9), null);
};

LocalUserSchema.methods.validPassword = function (password){
	return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('user', LocalUserSchema);
