'use strict'

var express = require('express');
var router = express.Router();
var User = require('../lib/user');
var UserSchema = require('../lib/userSchema');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login', {title: 'Login'});
});

router.post('/', function(req, res, next) {
	var data = req.body.user;
	if (data == null) {
		data = ({id: req.body.userid, password: req.body.password})
	}

	User.authenticate(data.id, data.password, function(err, user) {
		if (err) return next(err);

		if (user != null) {
			req.session.uid = user.id;
			res.redirect('/');
		} else {
			res.error("Sorry! invalid credentials.");
			res.redirect('back');
		}
	});
});

router.get('/logout', function(req, res, next) {
	req.session.destroy(function(err) {
		if (err) throw err;
		res.redirect('/');
	});
});

module.exports = router;
