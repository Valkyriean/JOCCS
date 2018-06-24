var fork = require('child_process').fork;
var rmdir = require('../../prototype/utils/rmdir');

exports.unitTest = function(req, res, next) {

    var date = new Date().getTime() + "";
    var child_2 = fork('prototype/processTime.js')

    child_2.on('message', function(data) {
        child.kill();
        child_2.kill();
        if(req.body.language == 'java') rmdir.rmdir("./prototype/compileFolder/" + date + "_java");
        else if(req.body.language == 'python') rmdir.rmdir("./prototype/compileFolder/" + date + "_python");
        res.json({status: data.message});
    });

    child_2.send({time: 5000});

    if(req.body.language == 'java') {

        var child = fork('prototype/unitTestingJava.js');

        child.on('message', function(data) {
            child.kill();
            child_2.kill();
            res.json({status: "success", result: data.result});
        });
        child.send({code: req.body.code, unitTest: req.body.unitTest});

    } else if(req.body.language == 'python') {

        var child = fork('prototype/unitTestingPython.js');

        child.on('message', function(data) {
            child.kill();
            child_2.kill();
            res.json({status: "success", result: data.result});
        })
        child.send({code: req.body.code, unitTest: req.body.unitTest});

    } else {
        child_2.kill();
        res.json({status: "unsupported language"});
    };
};
