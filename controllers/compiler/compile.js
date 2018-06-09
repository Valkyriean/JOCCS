var runJava = require('../../prototype/java').runJava;
var runPython = require('../../prototype/python').runPython;

exports.compile = function(req,res) {
    var result;
    if(req.body.language === 'java') result = runJava(req.body.input, req.body.output, req.body.code);
    else if(req.body.language === 'python') result = runPython(req.body.input, req.body.output, req.body.code);
    else res.json({"status": "language not support yet, please wait for future update"});

    req.result = result;
    next();
}

exports.onlyCompile = function(req, res) {
    var result;
    if(req.body.language === 'java') result = runJava(req.body.input, req.body.output, req.body.code);
    else if(req.body.language === 'python') result = runPython(req.body.input, req.body.output, req.body.code);
    else res.json("status": "language not support yet");

    res.json({'status': result});
}
