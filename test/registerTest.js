'use strict'

var request = require('supertest');
var should = require('should');
var app = require('../app');
var mongoose = require('mongoose');
var User = require('../lib/user');

if (mongoose.connection.readyState != 2) {
	mongoose.connect("mongodb://127.0.0.1:27017/test")
}

describe('acceptence test', function () {
	beforeEach(function(done) {
		User.removeAll(function(err) {
			done();
		});
	});

	describe('register', function () {
		it('Should can be register.', function (done) {
			var user = {
				user:{id:'kh', passowrd:'passowrd'}};
			request(app)
				.post('/register')
				.send(user)
				.expect(302)
				.end(done);
		});
	});
});