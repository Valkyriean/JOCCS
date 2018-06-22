var express = require('express');
var router = express.Router();
var compilerRouter = require('./compiler');

router.use('/compiler', compilerRouter);


router.post('/test', function(req, res, next) {
  console.log("I've been testified");
  res.json({'status':'success'});
});

module.exports = router;
