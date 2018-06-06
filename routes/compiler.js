var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
    if(req.body.language === 'java'){
        router.post('/', )
    }else if(req.body.language === 'python'){
        router.post('/', )
    }else{
        //going to error response
    }
});

module.exports = router;
