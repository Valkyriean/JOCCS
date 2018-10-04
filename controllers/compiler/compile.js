var fork = require('child_process').fork
var rmdir = require('../../prototype/utils/rmdir');

exports.compile = function(req,res,next) {

    var date = new Date().getTime() + "";
    var child_2 = fork('prototype/processTime.js')

    var inputArr = req.body.input;
    if(typeof(req.body.input) == "string") {
      inputArr.replace("\r","");
      inputArr = inputArr.split("\n");
    }

    child_2.on('message', function(data) {
      child.kill();
      child_2.kill();
      if(req.body.language == 'java') {
        rmdir.rmdir("./prototype/compileFolder/" + date + "_java")
      } else {
        //rmdir.rmdir("./prototype/compileFolder/" + date + "_python")
      }
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
        child.send({input: inputArr, code: req.body.code, date: date});

    } else if(req.body.language === 'python'){

        var child = fork('prototype/python.js');

        child.on('message', function(data) {
          child.kill();
          child_2.kill();
          req.result = data.result;
          next();
        })
        child.send({input: inputArr, code: req.body.code, date: date});

    }else{
        child_2.kill()
        res.json({"status": "Unsupported language"});
    }
}

exports.onlyCompile = function(req, res) {

    var child_2 = fork('prototype/processTime.js');
    var date = new Date().getTime() + ""
    //console.log(date);

    var inputArr = req.body.input;
    if(typeof(req.body.input) == "string") {
      inputArr.replace("\r","")
      inputArr = inputArr.split("\n")
    }

    child_2.on('message', function(data) {
      child.kill();
      child_2.kill();
      if(req.body.language == 'java') {
        rmdir.rmdir("./prototype/compileFolder/" + date + "_java")
      } else {
        //rmdir.rmdir("./prototype/compileFolder/" + date + "_python")
      }
      res.json({'status': data.message});
    })
    child_2.send({time: 5000})

    if(req.body.language === 'java'){

      var child = fork('prototype/java.js')

      child.on('message', function(data) {
        child.kill();
        child_2.kill();
        console.log(data.result)
        res.json({'result': data.result, 'status': "success"})
      })
      child.send({input: inputArr, code: req.body.code, date: date});

    } else if(req.body.language === 'python'){

      var child = fork('prototype/python.js');

      child.on('message', function(data) {
        child.kill()
        child_2.kill()
        console.log(data.result)
        res.json({'result': data.result, 'status': "success"});
      });
      child.send({input: inputArr, code: req.body.code, date: date});

    } else{

      child_2.kill();
      res.json({'status': "unsupported language"});

    };
};
