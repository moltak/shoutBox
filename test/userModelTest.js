'use strict'

var should = require('should');
var mongoose = require('mongoose');
var User = require('../lib/user')
var UserSchema = require('../lib/userSchema')
var async = require('async');

mongoose.connect("mongodb://127.0.0.1:27017/test")

describe('model test', function() {

	beforeEach(function(done) {
		User.removeAll(function(err) {
			done();
		});
	});

	describe('User model test', function() {
		it ('Should it can be save', function(done) {
			var user = new User(new UserSchema({id: 'userId', password: 'password'}));
			user.save(function(err, doc) {
				should.not.exist(err);

				User.find(user.user.id, function(err, doc) {
					should.not.exist(err);
					doc.length.should.equal(1);
					done();
				});
			});
		});

		it('Should update if it was there.', function(done) {
			var user = new User(new UserSchema({id: 'userId', password: 'password'}));
			user.save(function(err, doc) {
				should.not.exist(err);

				user.user.password = 'password2';
				user.save(function(err, doc) {
					User.find(user.user.id, function(err, doc) {
						should.not.exist(err);
						doc.length.should.equal(1);
						doc[0].password.should.equal('password2');
						done();
					});
				});
			});
		});

		it('Should it can be update', function(done) {
			var user = new User(new UserSchema({id: 'userId', password: 'password'}));
			user.save(function(err, doc) {
				user.user.password = 'password2';
				user.update(function(err, doc) {
					doc.ok.should.equal(1);
					User.findOne(user.user.id, function(err, doc) {
						doc.password.should.equal('password2');
						done();
					});
				});
			});
		});

		it('Should it remove all', function(done) {
			async.series([
				function(fn) {
					var user = new User(new UserSchema({id: 'userId1', password: 'password'}));
					user.save(function(err, doc) {
						fn(null, 1);
					});
				},
				function(fn) {
					var user = new User(new UserSchema({id: 'userId2', password: 'password'}));
					user.save(function(err, doc) {
						fn(null, 2);
					});
				}, 
				function(fn) {
					User.findAll(function(err, doc) {
						doc.length.should.equal(2);
						User.removeAll(function(err, doc) {
							fn(null, 3);
						});
					});
				},
				function(fn) {
					User.findAll(function(err, doc) {
						doc.length.should.equal(0);
						done();
					});
				}]);
		});
	});
});