var fs = require('fs');
var spawn = require('child_process').spawn;
var rmdir = require('./utils/rmdir');
var remove = require('./utils/functions').remove;

process.on('message', function(data) {

    var code = data.code;
    var unitTest = data.unitTest;
    var code = code + "\n" + unitTest;

    code = code.replace(/\/\*(\s|.)*?\*\//g, "");
    code = code.replace(/\/\/(\s|.)*?\n/g,"");

    var time = 0;
    if(code.match(/\.println\((\s|.)*?\)/g) != null) time = code.match(/\.println\((\s|.)*?\)/g).length

    var res = unitTest.match(/[^{]*/);
    var codeTokens = res[0].trim().splice(" ");
    var classname = codeTokens[codeTokens.length - 1];

    var foldername = data + "_" + "java";
    var classpath = "./prototype/compileFolder/" + foldername;
    fs.mkdirSync(classpath);
    fs.writeFileSync(classpath + "/" + classname + ".java", code);

    var command = "javac";
    var parameter = [classpath + "/" + classname + ".java"];
    var child = spawn(command, parameter);

    child.on('exit', function(code, signal) {

        child.kill();

        var output = [""];

        if(code == 0) {
            command = "java";
            parameter = ["-classpath", classpath, classname];
            var runclass = spawn(command, parameter);

            runclass.on('exit', function(code, signal) {
                runclass.kill();
                rmdir.rmdir(classpath);
                if(typeof(output) == 'object') {
                    var arr = [""];
                    output = toSingle(output, arr);
                    output.splice(0,2);
                    output = remove(output);
                };
                console.log(output);
                process.send({result: output});
            });

            runclass.stdout.on('data', function(data) {
                if(data.toString().match(/[\[\]\(\)\{\}]/g) != null) output.push(data.toString().trim().replace(/[\'\"\\\/\b\f\t\r]/g, '').split("\n"));
                else output = data.toString().replace(/[\'\"\\\/\b\f\n\r\t]/g, '');
            });

            runClasss.stderr.on('data', function(data) {
                output = data.toString().replace(/[\'\"\\\/\b\f\t\r]/g, '');
                rmdir.rmdir(classpath);
                process.send({result: output});
            });
        };
    });

    child.stdout.on('data', function(data) {
        rmdir.rmdir(classpath);
        process.send({result: data.toString().replace(/[\b\f\t\r]/g, '')});
    });

    child.stderr.on('data', function(data) {
        rmdir.rmdir(classpath);
        process.send({result: data.toString().replace(/[\b\f\t\r]/g, '')});
    });
});
