'use strict'

var mongoose = require('mongoose');

var User = new mongoose.Schema({
	id: {type:String},
	password: {type:String}
});

module.exports = mongoose.model('User', User)