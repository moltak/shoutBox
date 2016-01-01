'use strict'

var User = require('../user');

module.exports = function(req, res, next) {
	var uid = req.session.uid;
	if (uid == null) return next();

	User.findOne(uid, function(err, user) {
		if (err) return next(err);
		req.user = res.locals.user = user;
		next();
	});
};