var express = require('express');
var router = express.Router();

var Entry = require('../lib/entry');
var EntrySchema = require('../lib/entrySchema');
var validate = require('../lib/middleware/validate');
var page = require('../lib/middleware/page');

router.get('/', page(Entry.count, 5), function(req, res, next) {
	var page = req.page;

	Entry.getRange(page.from, page.to, function(err, entries) {
		if (err) return next(err);
		res.render('entries', {
			title: 'Entries',
			entries: entries,
		});
	});
});

router.get('/create', function(req, res, next) {
	res.render('post', {title: 'Post'});
});

router.post('/', 
	validate.required('title'), 
	validate.lengthAbove('title', 4),
	function(req, res, next) {
		var data = req.body.data;
		var title = req.body.title;

		var entry = new Entry(new EntrySchema({
			userName: res.locals.user.id,
			title: title,
			data: data
		}));

		entry.save(function(err) {
			if (err) return next(err);
			res.redirect('/post');
		});
	}
);

module.exports = router;
