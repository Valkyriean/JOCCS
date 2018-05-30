var fs = require('fs');
var spawn = require('child_process').spawn;
var rmdir = require('./utils/rmdir');

var input = fs.readFileSync('./package/input.txt').toString();
var inputArr = input.split("\r\n")
inputArr.pop()

//var output = fs.readFileSync('')

//console.log(inputArr)


var code = fs.readFileSync('./package/code.txt').toString();
var res = code.match(/[^{]*/);
var codeTokens=res[0].trim().split(" ")
var classname=codeTokens[codeTokens.length-1];


var foldername=new Date().getTime()+"_"+classname;
var classpath="compileFolder/"+foldername
fs.mkdirSync(classpath);
fs.writeFileSync(classpath+"/"+classname+".java", code);
//java -classpath compileFolder/test/ Test

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

var inputArr = ["10", "20", "hehe"];
var actualOutput = [];


//var command = "java";
//var parameter = ["-classpath", classpath ,classname];
var command = "javac";
var parameter = [classpath+"/"+classname+".java"];
var child  = spawn(command, parameter);


  child.on('exit', function (code, signal) {

        child.kill();

        if(code == 0){
            command = "java";
            parameter = ["-classpath", classpath ,classname];
            var output="";
            //lets the child message through the console

            inputArr.forEach(function(item) {

              console.log("item:" + item.replace(/[\'\"\\\/\b\f\n\r\t]/g, ''));

              item = item.replace(/[\'\"\\\/\b\f\n\r\t]/g, '');

              var runClass=spawn(command, parameter);

              runClass.stdin.setEncoding('utf-8');

              runClass.stdin.write(item);
                sleep(1000);

                runClass.stdin.end();


              runClass.on('exit', function (code, signal) {

                  runClass.kill();
                  rmdir.rmdir(classpath);
                  //console.log(output);


              })


              runClass.stdout.on('data', function (data) {

                  if(data.toString().replace(/[\'\"\\\/\b\f\n\r\t]/g, '') === "" & item != null){

                  } else {
                    output=output+data.toString();
                    actualOutput.push(data.toString().replace(/[\'\"\\\/\b\f\n\r\t]/g, ''))
                    //console.log(output);
                    console.log(actualOutput);
                      sleep(1000);

                  }

              });

              runClass.stderr.on('data', function (data) {
                  output=output+data.toString();
              });
            })


        }
    });

    //lets the child message through the console
    child.stdout.on('data', function (data) {
        //console.log(data.toString().replace(/[\'\"\\\/\b\f\n\r\t]/g, ''));
    });

    child.stderr.on('data', function (data) {
        console.log(data.toString());

        rmdir.rmdir(classpath);

    });


/*child.on('exit', function (code, signal) {

    child.kill();

    if(code == 0){
        command = "java";
        parameter = ["-classpath", classpath ,classname];
        var output="";
        var runClass=spawn(command, parameter);
        //lets the child message through the console

        runClass.stdin.setEncoding('utf-8');

        runClass.stdin.write("FuckDavid\n");

        runClass.stdin.end();


        runClass.on('exit', function (code, signal) {
            runClass.kill();
            rmdir.rmdir(classpath);
            console.log(output);
        })

        runClass.stdout.on('data', function (data) {
            output=output+data.toString();
            console.log(output);
        });
        runClass.stderr.on('data', function (data) {
            output=output+data.toString();
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
*/
