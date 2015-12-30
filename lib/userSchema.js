'use strict'

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	id: {type:String},
	password: {type:String}
});

module.exports = mongoose.model('UserSchema', UserSchema)