var express = require('express');
var router = express.Router();
var compilerRouter = require('./compiler');

router.use('/compiler', compilerRouter);


module.exports = router;
