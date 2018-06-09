var express = require('express');
var router = express.Router();
var compile = require('../controllers/compiler/compile');
var compare = require('../controllers/compiler/compare');

router.post('/compare', compile.compile, compare.compare);
//Get input,output,code,language Return report?
router.post('/compile', compile.onlyCompile);
//Get input,code,language Return output

module.exports = router;
