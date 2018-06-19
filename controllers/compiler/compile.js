//var runJava = require('../../prototype/java').runJava;
//var runPython = require('../../prototype/python').runPython;
var fork = require('child_process').fork

exports.compile = function(req,res,next) {

    var child_2 = fork('prototype/test2.js')

    child_2.on('message', function(data) {
      child.kill();
      child_2.kill();
      res.json({'status': data.message});
    })
    child_2.send({time: 5000});

    if(req.body.language === 'java'){

        var child = fork('prototype/java.js')

        child.on('message', function(data) {
          child.kill();
          child_2.kill();
          req.result = data.result;
          next();
        });
        child.send({input: req.body.input, code: req.body.code});

    } else if(req.body.language === 'python'){

        var child = fork('prototype/python.js');

        child.on('message', function(data) {
          child.kill();
          child_2.kill();
          req.result = data.result;
          next();
        })
        child.send({input: req.body.input, code: req.body.code});

    }else{
        res.json({"status": "Unsupported language"});
    }
}

exports.onlyCompile = function(req, res) {

    var child_2 = fork('prototype/test2.js');

    child_2.on('message', function(data) {
      child.kill();
      child_2.kill();
      res.json({'status': data.message});
    })

    if(req.body.language === 'java'){

      var child = fork('prototype/java.js')

      child.on('message', function(data) {
        child.kill();
        child_2.kill();
        res.json({'result': data.result, 'status': "success"})
      })
      child.send({input: req.body.input, code: req.body.code});

    } else if(req.body.language === 'python'){

      var child = fork('prototype/python.js');

      child.on('message', function(data) {
        child.kill()
        res.json({'result': data.result, 'status': "success"});
      });
      child.send({input: req.body.input, code: req.body.code});

    } else{

      res.json({'status': "unsupported language"});

    };
};
