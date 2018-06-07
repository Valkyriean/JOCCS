var fs = require('fs');
var spawn = require('child_process').spawn;
var rmdir = require('./utils/rmdir');
var isEqual = require('./utils/functions').isEqual;

function trimSpace(str) {
  var a = str.replace(/\s/g, "");
  return a;
}

function runPython(inputArr, outputArr, code) {

  if(code.match(/input\((.*)\)?/g) != null) {
    code = code.replace(/input\((.*[^\)])\)/g, 'input("")');
  };

  var foldername = new Date().getTime() + "_" + "python";
  var path = "compileFolder/" + foldername;
  fs.mkdirSync(path);
  fs.writeFileSync(path + "/" + "python.py", code);

  var command = "python";
  var parameter = [path + "/python.py"];
  var result = spawn(command, parameter);

  result.stdin.setEncoding('utf-8');
  inputArr.forEach(function(item) {
    result.stdin.write("'" + item.replace(/[\'\"\\\/\b\f\n\r\t]/g, '') + "'" + "\n");
  })
  result.stdin.end()

  result.on('exit', function(code, signal) {
      result.kill();
      rmdir.rmdir(path);
      var equal = isEqual(output, outputArr);
      console.log(equal);
  })

  result.stdout.on('data', function(data) {
      console.log(data.toString());
      if(data.toString().match(/[\[\]\(\)\{\}]/) == null) {
          output = data.toString().replace(/[\'\"\\\/\b\f\n\r\t]/g, '').split("\r\n")
          if(output.length != 1 & output.length != 0) output.pop();
      } else output = data.toString().replace(/[\'\"\\\/\b\f\n\r\t]/g, '')
  });

  result.stderr.on('data', function(data) {
      console.log(data.toString())
      rmdir.rmdir(path);
  })
}

exports.runPython = runPython;
