'use strict'

var request = require('supertest');
var should = require('should');
var app = require('../app');
var mongoose = require('mongoose');
var User = require('../lib/user');

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