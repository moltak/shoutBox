'use strict'

var mongoose = require('mongoose');

var EntrySchema = new mongoose.Schema({
	title: String,
	data: String,
	userName: String
});

module.exports = mongoose.model('entry', EntrySchema)