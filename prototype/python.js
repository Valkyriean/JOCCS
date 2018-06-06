var fs = require('fs');
var spawn = require('child_process').spawn;
var rmdir = require('./utils/rmdir');
var isEqual = require('./utils/functions').isEqual;

// var input_0 = fs.readFileSync('./TestCases/Python/Case_4/input.txt').toString();
// var inputArr = input_0.split("\r\n");
// if(inputArr.length != 0 & inputArr.length != 1) inputArr.pop();
//
// var output_0 = fs.readFileSync('./TestCases/Python/Case_4/output.txt').toString();
// if(output_0.match(/\[(.*)\]/) == null){
//   var outputArr = output_0.trim().split("\r\n");
//   if(outputArr.length != 1 & outputArr.length != 0) outputArr.pop();
// } else var outputArr = output_0.replace(/[\'\"\\\/\b\f\n\r\t]/g, '');
//
// var code = fs.readFileSync('./TestCases/Python/Case_4/Test.py').toString();
// if(code.match(/input\((.*)\)?/g) != null) {
//   code = code.replace(/input\((.*[^\)])\)/g, 'input("")');
// };
//
// var foldername = new Date().getTime() + "_" + "python";
// var path = "compileFolder/" + foldername;
// fs.mkdirSync(path);
// fs.writeFileSync(path + "/" + "python.py", code);

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
