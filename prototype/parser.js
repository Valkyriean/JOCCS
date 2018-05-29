var fs = require('fs');
var spawn = require('child_process').spawn;
var rmdir = require('./utils/rmdir');


var code = fs.readFileSync('code.txt').toString();
var res = code.match(/[^{]*/);
var codeTokens=res[0].trim().split(" ")
var classname=codeTokens[codeTokens.length-1];


var foldername=new Date().getTime()+"_"+classname;
var classpath="compileFolder/"+foldername
fs.mkdirSync(classpath);
fs.writeFileSync(classpath+"/"+classname+".java", code);
//java -classpath compileFolder/test/ Test



//var command = "java";
//var parameter = ["-classpath", classpath ,classname];
var command = "javac";
var parameter = [classpath+"/"+classname+".java"];
var child  = spawn(command, parameter);
child.on('exit', function (code, signal) {
    child.kill();
    if(code==0)
    {
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
});
