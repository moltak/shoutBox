'use strict'

var should = require('should');
var mongoose = require('mongoose');
var async = require('async');

var Entry = require('../lib/entry');
var EntrySchema = require('../lib/entrySchema');
var User = require('../lib/user');
var UserSchema = require('../lib/userSchema');

describe('Entry model test', function() {
	before(function(done) {
		if (mongoose.connection.readyState != 2) {
			mongoose.connect("mongodb://127.0.0.1:27017/test")
		}
		Entry.removeAll();
		done();
	});

	after(function(done) {
		mongoose.disconnect();
		done();
	});

	it('Should it can be saved.', function(done) {
		var entry = new Entry(new EntrySchema({data:'{json:data}', title:'title', userName:'userName'}));
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
		Entry.getRange(0, 1, function(err, doc) {
			doc.length.should.equal(1);
			done();
		});
	});

	it('Should user has many entries', function(done) {
		var user = new User(new UserSchema({id:'user2', password:'password'}));
		async.waterfall([
			function(fn) {
				user.save(function(err, doc) {
					fn(null);
				});
			},
			function(fn) {
				User.findOne('user2', function(err, doc) {
					fn(null, doc);
				});
			},
			function(user, fn) {
				var entry = new Entry(new EntrySchema(
					{data:'data', 
					title:'title', 
					userName:'userName',
					user: user}));
				entry.save(function(err, doc) {
					if (err) return console.error(err);
					done();
				}) 
			}
			]);
	});
});