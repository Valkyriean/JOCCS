var fs = require('fs');
var spawn = require('child_process').spawn;
var rmdir = require('./utils/rmdir');
var toSingle = require('./utils/functions').toSingle;
var remove = require('./utils/functions').remove;

process.on('message', function(data) {
      var inputArr = data.input;
      var code = data.code;

      code = code.replace(/\/\*(\s|.)*?\*\//g, "");
      code = code.replace(/\/\/(\s|.)*?\n/g,"");

      var time = 0;
      if(code.match(/\.println\((\s|.)*?\)/g) != null) time = code.match(/\.println\((\s|.)*?\)/g).length;

      var res = code.match(/[^{]*/);
      var codeTokens = res[0].trim().split(" ");
      var classname = codeTokens[codeTokens.length-1];

      var foldername = data.date + "_" + "java";
      var classpath = "./prototype/compileFolder/"+foldername;
      fs.mkdirSync(classpath);
      fs.writeFileSync(classpath+"/"+classname+".java", code);

      var command = "javac";
      var parameter = [classpath+"/"+classname+".java"];
      var child  = spawn(command, parameter);

      child.on('exit', function (code, signal) {
            var output = [""];
            child.kill();
            if(code == 0){
                command = "java";
                parameter = ["-classpath", classpath, classname];
                var runClass=spawn(command, parameter);
                //lets the child message through the console
                runClass.stdin.setEncoding('utf-8');
                if(typeof(inputArr) != 'object') runClass.stdin.write(inputArr.toString().replace(/[\'\"\\\/\b\f\n\r\t]/g, ''))
                else {
                  inputArr.forEach(function(item) {
                    runClass.stdin.write("'" + item.toString().replace(/[\b\f\n\r\t]/g, '') + "'" + "\n");
                  })
                }
                runClass.stdin.end();

                runClass.on('exit', function (code, signal) {
                    runClass.kill();
                    rmdir.rmdir(classpath);
                    if(typeof(output) == 'object') {
                      var arr = [""]
                      output = toSingle(output, arr);
                      output.splice(0,2);
                      output = remove(output);
                    };
                    //console.log(output);
                    process.send({result: output});
                });

                runClass.stdout.on('data', function(data) {
                    if(data.toString().match(/[\[\]\(\)\{\}]/) == null) {
                        output.push(data.toString().replace(/[\'\\\f\t\r]/g, '').split("\n"))
                        console.log("data:" + data.toString().replace(/[\'\\\f\t\r]/g, '').split("\n"))
                        console.log(data.toString().replace(/[\'\\\f\t\r]/g, '').split("\n")[0] == "")
                        //console.log("data:" + data.toString());
                        //if(output.length != 1 & output.length != 0) output.pop();
                    } else output = data.toString().replace(/[\'\\\f\n\r\t]/g, '')
                });

                runClass.stderr.on('data', function(data) {
                    //console.log(data.toString());
                    output = data.toString().replace(/[\b\f\t\r]/g, '');
                    console.log("err:" + data.toString());
                    rmdir.rmdir(classpath);
                    process.send({result: output});
                });
            };
        });

        //lets the child message through the console
        child.stdout.on('data', function (data) {
            //console.log(data.toString());
            rmdir.rmdir(classpath);
            process.send({result: data.toString().replace(/[\\\'\b\f\t\r]/g, '')});
        });

        child.stderr.on('data', function (data) {
            //console.log(data.toString());
            output = data.toString().replace(/[\b\f\t\r]/g, '');
            rmdir.rmdir(classpath);
            process.send({result: output});
        });
});
