'use strict'

var UserSchema = require('./userSchema');

function User(user) {
	this.user = user;
}

User.prototype.save = function(fn) {
	var user = this.user;
	UserSchema.find({id:user.id}, function(err, doc) {
		if (err) return fn(err, doc);

		if (doc.id) {
			this.update(fn); // this == mongoose object
		} else {
			user.save(fn);
		}
	});
}

User.prototype.update = function(fn) {
	UserSchema.update({id:this.user.id}, {password:this.user.password}, fn);
};

User.find = function(userId, fn) {
	UserSchema.find({id:userId}, fn)
};

User.findOne = function(userId, fn) {
	UserSchema.findOne({id:userId}, fn);
};

module.exports = User;