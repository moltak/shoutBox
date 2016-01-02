'use strict'

var mongoose = require('mongoose');

var EntrySchema = new mongoose.Schema({
	title: String,
	data: String,
	userName: String,
	user: {type: mongoose.Schema.Types.ObjectId, ref:'entry'},
});

module.exports = mongoose.model('entry', EntrySchema)