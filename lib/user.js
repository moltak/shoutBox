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
			this.update(fn);
		} else {
			user.save(fn);
		}
	});
}

User.prototype.update = function(fn) {
	console.log('update()');
};

User.find = function(userId, fn) {
	UserSchema.find({id:userId}, fn)
};

module.exports = User;