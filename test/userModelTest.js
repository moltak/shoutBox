'use strict'

var should = require('should');
var mongoose = require('mongoose');
var UserScheme = require('../model/userModel')

describe('model test', function() {
	describe('User model test', function() {
		it ('Should it can be save', function(done) {
			UserScheme.find({}, function(err, doc) {
				console.log(doc);
				done();
			});
		});
	});
});