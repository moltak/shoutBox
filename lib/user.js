'use strict'

var UserSchema = require('./userSchema');
var bcrypt = require('bcrypt');

function User(user) {
	this.user = user;
}

User.prototype.save = function(fn) {
	var user = this.user;
	var p = this;
	UserSchema.find({id:user.id}, function(err, doc) {
		if (err) return fn(err, doc);

		if (doc.id) {
			this.update(fn); // this == mongoose object
		} else {
			p.hashPassword(function(err) {
				if (err) return fn(err);

				user.save(fn);
			});
		}
	});
}

User.prototype.update = function(fn) {
	UserSchema.update({id:this.user.id}, {password:this.user.password}, fn);
};

User.prototype.remove = function(fn) {
	var user = this.user;
	UserSchema.remove({id:user.id}, fn);
};

User.prototype.hashPassword = function(fn) {
	var user = this.user;
	bcrypt.genSalt(2, function(err, salt) {
		if (err) return fn(err);

		user.salt = salt;
		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return fn(err);

			user.password = hash;
			fn();
		});
	});
};

User.find = function(userId, fn) {
	UserSchema.find({id:userId}, fn)
};

User.findAll = function(fn) {
	UserSchema.find({}, fn);
};

User.findOne = function(userId, fn) {
	UserSchema.findOne({id:userId}, fn);
};

User.removeAll = function(fn) {
	UserSchema.remove({}, fn);
};

User.authenticate = function(userId, password, fn) {
	User.findOne(userId, function(err, user) {
		if (err) return fn(err);
		if (!user.id) return fn();
		bcrypt.hash(password, user.salt, function(err, hash) {
			if (err) return fn(err);
			if (hash == user.password) return fn(null, user);
			fn();
		});
	});
};

module.exports = User;
















