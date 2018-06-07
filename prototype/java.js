var fs = require('fs');
var spawn = require('child_process').spawn;
var rmdir = require('./utils/rmdir');
var isEqual = require('./utils/functions').isEqual;

function runJava(inputArr, outputArr, code) {
  var res = code.match(/[^{]*/);
  var codeTokens=res[0].trim().split(" ")
  var classname=codeTokens[codeTokens.length-1];

  var foldername=new Date().getTime()+"_"+classname;
  var classpath="compileFolder/"+foldername
  fs.mkdirSync(classpath);
  fs.writeFileSync(classpath+"/"+classname+".java", code);

  var command = "javac";
  var parameter = [classpath+"/"+classname+".java"];
  var child  = spawn(command, parameter);

  child.on('exit', function (code, signal) {
        child.kill();
        if(code == 0){
            command = "java";
            parameter = ["-classpath", classpath ,classname];
            var output="";
            var runClass=spawn(command, parameter);
            //lets the child message through the console

            runClass.stdin.setEncoding('utf-8');

            runClass.stdin.write(inputArr[0] + "\n");

            runClass.stdin.end();

            runClass.on('exit', function (code, signal) {
                runClass.kill();
                rmdir.rmdir(classpath);
                console.log(output);
            });

            runClass.stdout.on('data', function (data) {
                console.log(data.toString());

            });

            runClass.stderr.on('data', function (data) {
                console.log(data.toString());
            });
        }
    });

    //lets the child message through the console
    child.stdout.on('data', function (data) {
        console.log(data.toString());
    });

    child.stderr.on('data', function (data) {
        console.log(data.toString());
        rmdir.rmdir(classpath);
    });
}

exports.runJava = runJava;
