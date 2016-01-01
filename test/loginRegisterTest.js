'use strict'

var request = require('supertest');
var should = require('should');
var mongoose = require('mongoose');
var User = require('../lib/user');
var app = require('../app');

describe('acceptence test', function () {
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

	describe('login', function () {
		it('Should can be login', function (done) {
			var user = {user:{id:'kh', passowrd:'passowrd'}};
			request(app)
				.post('/login')
				.send(user)
				.expect(302)
				.end(done);
		});
	});
});