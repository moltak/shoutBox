'use strict'

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	id: String,
	password: String,
	salt: String
});

module.exports = mongoose.model('user', UserSchema)