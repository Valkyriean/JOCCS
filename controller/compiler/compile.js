var runJava = require('../../prototype/java').runJava;
var runPython = require('../../prototype/python').runPython;

exports.compile = function(req,res) {
    var result;
    if(req.body.language == 'java') result = runJava(req.body.input, req.body.output, req.body.code);
    else result = runPython(req.body.input, req.body.output, req.body.code);

    req.result = result;
    next();
}
