var runJava = require('../../prototype/java').runJava;
var runPython = require('../../prototype/python').runPython;
var fork = require('child_process').fork

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
      var child = fork('prototype/test.js')
      child.on('message', function(data) {
        console.log(data.message)
        child.kill()
        res.json({'status': data.message})
      })
      child.send({hello: "hello"})
      //result = runJava(req.body.input, req.body.code);
      status = "success";
    }else if(req.body.language === 'python'){
      result = runPython(req.body.input, req.body.code);
      status = "success";
    }else{
      status = "Unsupported language";
    }
    //res.json({"status": status, 'result': result});
}
