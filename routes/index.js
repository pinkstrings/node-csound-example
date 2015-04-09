var express = require('express');
var router = express.Router();
var debug = require('debug')('node-csound:server');

/* GET home page. */
router.get('/', function(req, res, next) {

	var params = {
		title: 'node-csound demo <3',
		content: '<p>Click <a class="click-me" save-file="1">to save</a> or <a class="click-me" save-file="0">to listen</a></p>'
	};

  res.render('index', params);
});

module.exports = router;
