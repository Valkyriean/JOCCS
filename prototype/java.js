var fs = require('fs');
var spawn = require('child_process').spawn;
var rmdir = require('./utils/rmdir');

var runJava = function(inputArr, code){
  var res = code.match(/[^{]*/);
  var codeTokens=res[0].trim().split(" ")
  var classname=codeTokens[codeTokens.length-1];

  var foldername=new Date().getTime()+"_"+classname;
  var classpath="./"+foldername
  fs.mkdirSync(classpath);
  fs.writeFileSync(classpath+"/"+classname+".java", code);

  var command = "javac";
  var parameter = [classpath+"/"+classname+".java"];
  var child  = spawn(command, parameter);

  console.log("input" + inputArr);

  child.on('exit', function (code, signal) {
        var output;
        child.kill();
        if(code == 0){
            command = "java";
            parameter = ["-classpath", classpath ,classname];
            var runClass=spawn(command, parameter);
            //lets the child message through the console
            runClass.stdin.setEncoding('utf-8');
            if(typeof(inputArr) != 'object') runClass.stdin.write(inputArr.toString().replace(/[\'\"\\\/\b\f\n\r\t]/g, ''))
            else {
              inputArr.forEach(function(item) {
                runClass.stdin.write("'" + item.replace(/[\'\"\\\/\b\f\n\r\t]/g, '') + "'" + "\n");
              })
            }
            runClass.stdin.end();

            runClass.on('exit', function (code, signal) {
                runClass.kill();
                rmdir.rmdir(classpath);
                return output;
                //return isEqual(outputArr, output);
            });

            runClass.stdout.on('data', function (data) {
                //console.log(data.toString());
                if(data.toString().match(/[\[\]\(\)\{\}]/) == null) {
                    output = data.toString().replace(/[\'\"\\\/\b\f\n\r\t]/g, '').split("\r\n")
                    if(output.length != 1 & output.length != 0) output.pop();
                } else output = data.toString().replace(/[\'\"\\\/\b\f\n\r\t]/g, '')
                console.log("output" + output);
            });

            runClass.stderr.on('data', function (data) {
                //console.log(data.toString());
                output = data.toString();
                rmdir.rmdir(path);
                return output;
            });
        }
    });

    //lets the child message through the console
    child.stdout.on('data', function (data) {
        //console.log(data.toString());
    });

    child.stderr.on('data', function (data) {
        //console.log(data.toString());
        output = data.toString();
        rmdir.rmdir(classpath);
        return output;
    });
}

exports.runJava = runJava;
