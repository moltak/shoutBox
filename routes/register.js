'use strict'

var express = require('express');
var router = express.Router();
var User = require('../lib/user');
var UserSchema = require('../lib/userSchema');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('register', {title: 'Register'});
});

router.post('/', function(req, res, next) {
	var data = req.body.user;
	if (data == null) {
		data = ({id: req.body.userid, password: req.body.password});
	}

	User.findOne(data.id, function(err, user) {
		if (err) return next(err);

		if (user != null) {
			res.error('Username already taken!');
			res.redirect('back');
		} else {
			user = new UserSchema({id: data.id, passowrd: data.password});
			user.save(function(err) {
				if (err) return next(err);
				req.session.uid = user.id;
				res.redirect('/');
			});
		}
	});
});

module.exports = router;
