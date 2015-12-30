'use strict'

var should = require('should');
var mongoose = require('mongoose');
var User = require('../lib/user')

mongoose.connect("mongodb://127.0.0.1:27017/test")

describe('model test', function() {

	beforeEach(function(done) {
		User.remove({}, function(err) {
			done();
		});
	});

	describe('User model test', function() {
		it ('Should it can be save', function(done) {
			var user = new User({id: 'userId', password: 'password'});
			user.save(function(err, doc) {
				should.not.exist(err);
				// should.doc.length.equal(1);
				console.log(doc);
				done();
			});
		});
	});
});