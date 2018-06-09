var runJava = require('../../prototype/java').runJava;
var runPython = require('../../prototype/python').runPython;

exports.compile = function(req,res) {
    var result;
    var status;
    if(req.body.language === 'java'){
        result = runJava(req.body.input, req.body.code);
        status = "success";
    }else if(req.body.language === 'python'){
        result = runPython(req.body.input, req.body.code);
        status = "success";
    }else{
        res.json({"status": "Unsupported language"});
    }
    req.result = result;
    next();
}

exports.onlyCompile = function(req, res) {
    var result;
    var status;
    if(req.body.language === 'java'){
      result = runJava(req.body.input, req.body.code);
      status = "success";
    }else if(req.body.language === 'python'){
      result = runPython(req.body.input, req.body.code);
      status = "success";
    }else{
      status = "Unsupported language";
    }
    res.json({"status": status, 'result': result});
}
