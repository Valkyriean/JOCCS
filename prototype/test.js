var fs = require('fs');
var spawn = require('child_process').spawn;
var rmdir = require('./utils/rmdir');

var input = fs.readFileSync('./package/input.txt').toString();
var inputArr = input.split("\r\n");
inputArr.pop();

var output = fs.readFileSync('./package/output.txt').toString();
var outputArr = output.split("\r\n");
outputArr.pop();

var code = fs.readFileSync('./package/code.txt').toString();
var res = code.match(/[^{]*/);
var codeTokens=res[0].trim().split(" ")
var classname=codeTokens[codeTokens.length-1];


var foldername=new Date().getTime()+"_"+classname;
var classpath="compileFolder/"+foldername
fs.mkdirSync(classpath);
fs.writeFileSync(classpath+"/"+classname+".java", code);
//java -classpath compileFolder/test/ Test

var actualOutput = [];

function abc(arr, time, output) {
    var output_1 = output;
    if (time < arr.length) {
        var command = "java";
        var parameter = ["-classpath", classpath ,classname];
        var runClass=spawn(command, parameter);

        runClass.stdin.setEncoding('utf-8');
        runClass.stdin.write(arr[time].toString().replace(/[\'\"\\\/\b\f\n\r\t]/g, ''));
        runClass.stdin.end();

        runClass.on('exit', function(code, signal) {
            runClass.kill();
            abc(arr, time + 1, output_1);
            //console.log("time:" + time);
        })

        runClass.stdout.on('data', function(data) {
          if(data.toString().replace(/[\'\"\\\/\b\f\n\r\t]/g, '') === "" & arr[time] != null){

          } else {
            output_1.push(data.toString().replace(/[\'\"\\\/\b\f\n\r\t]/g, ''))
            //console.log(output);
            //console.log(output_1);
            //console.log("haha");
          }
        })

        runClass.stderr.on('data', function(data) {
            console.log(data.toString());
        })
    } else {
        output_1.splice(0,1);
        console.log(output_1);
        rmdir.rmdir(classpath)
        return output_1;
    }
}

var command = "javac";
var parameter = [classpath+"/"+classname+".java"];
var child = spawn(command,parameter);
var time = 0;

child. on('exit', function(code, signal) {
  child.kill()
  if(code == 0) {
    var output = [""];

    abc(inputArr, time, output);

  }
})

child.stdout.on('data', function(data) {
  console.log(data.toString());
})

child.stderr.on('data', function(data) {
  console.log(data.toString());
})
