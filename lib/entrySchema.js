'use strict'

var mongoose = require('mongoose');

var EntrySchema = new mongoose.Schema({
	data: String
});

module.exports = mongoose.model('entry', EntrySchema)