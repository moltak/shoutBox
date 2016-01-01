'use strict'

var should = require('should');
var mongoose = require('mongoose');
var async = require('async');
var Entry = require('../lib/entry');
var EntrySchema = require('../lib/entrySchema');

describe('Entry model test', function() {
	before(function(done) {
		if (mongoose.connection.readyState != 2) {
			mongoose.connect("mongodb://127.0.0.1:27017/test")
		}
		done();
	});

	after(function(done) {
		mongoose.disconnect();
		done();
	});

	it('Should it can be saved.', function(done) {
		var entry = new Entry(new EntrySchema({data:'{json:data}'}));
		entry.save(function(err, doc) {
			should.not.exist(err);
			should.exist(doc);
			done();
		});
	});

	it('Should return all', function(done) {
		Entry.findAll(function(err, doc) {
			should.not.exist(err);
			doc.length.should.be.above(0);
			done();
		});
	});

	it('Should return 10 entries', function(done) {
		Entry.getByrange(0, 1, function(err, doc) {
			doc.length.should.equal(1);
			done();
		});
	});
});