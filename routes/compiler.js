var express = require('express');
var router = express.Router();
var compile = require('../controllers/compile/compile');
var compare = require('../controllers/compile/compare');

router.post('/compare', compile.compile, compare.compare);

module.exports = router;
