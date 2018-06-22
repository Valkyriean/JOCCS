var fs = require('fs');
var spawn = require('child_process').spawn;
var rmdir = require('./utils/rmdir');

process.on('message', function(data) {

    var code = data.code;
    var unitTest = data.unitTest;
    var test = "unittest.main()";

    if(code.match(/input\((.*)\)?/g) != null) code = code.replace(/input\((.*)\)?/g, 'input("")');

    var foldername = new Date().getTime() + "_" + "python";
    var path = "./" + foldername;
    fs.mkdirSync(path);
    fs.writeFileSync(path + "/" + "main.py", code + "\n" + unitTest + "\n" + test);

    var command = "python";
    var parameter = [path + "/main.py"];
    var child = spawn(command, parameter);
    var output;

    child.on('exit', function(code, signal) {
        child.kill();
        rmdir.rmdir(path);
        process.send({result: output});
    });

    child.stdout.on('data', function(data) {
        output = data.toString().replace(/[\b\f\r\t]/g, "");
    });

    child.stderr.on('data', function(data) {
        output = data.toString().replace(/[\b\f\r\t]/g, "");
        rmdir.rmdir(path);
        process.send({result: result});
    });
});
