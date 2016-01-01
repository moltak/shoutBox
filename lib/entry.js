'use strict'

var EntrySchema = require('./entrySchema');

function Entry(entry) {
	this.entry = entry;
}

Entry.prototype.save = function(fn) {
	var entry = this.entry;
	entry.data = JSON.stringify(entry.data);
	entry.save(fn);
};

Entry.findAll = function(fn) {
	EntrySchema.find({}, function(err, doc) {
		if (err) return fn(err);
		fn(null, Entry.toObject(doc));
	});
};

Entry.getRange = function(from, to, fn) {
	EntrySchema.find({}, function(err, doc) {
		if (err) return fn(err);
		fn(null, Entry.toObject(doc));
	}).skip(from).limit(to);
};

Entry.toObject = function(doc) {
	var entries = [];
	doc.forEach(function(item) {
		entries.push({
			title: item.title, 
			data: JSON.parse(item.data), 
			username: item.userName});
	});
	return entries;
};

Entry.count = function(fn) {
	EntrySchema.count({}, fn);
};

module.exports = Entry;