var fs = require('fs');
var spawn = require('child_process').spawn;
var rmdir = require('./utils/rmdir');

var input_0 = fs.readFileSync('./TestCases/Python/Case_3/input.txt').toString();
var inputArr = input_0.split("\r\n");
if(inputArr.length != 0 & inputArr.length != 1) inputArr.pop();

var output_0 = fs.readFileSync('./TestCases/Python/Case_3/output.txt').toString();
if(output_0.match(/\[(.*)\]/) == null){
  var outputArr = output_0.trim().split("\r\n");
  if(outputArr.length != 1 & outputArr.length != 0) outputArr.pop();
} else var outputArr = output_0.trim().replace(/[\'\"\\\/\b\f\n\r\t]/g, '');

var code = fs.readFileSync('./TestCases/Python/Case_3/Test.py').toString();
var res = code.match(/input\((.*)\)/g);
if(res != null) {
  var res_0 = res[0].replace(/\((.*)\)/, '("")');
  code = code.replace(/input\((.*)\)/g, res_0);
}

var foldername = new Date().getTime() + "_" + "python";
var path = "compileFolder/" + foldername;
fs.mkdirSync(path);
fs.writeFileSync(path + "/" + "python.py", code);

var output = [];

function trimSpace(str) {
  var a = str.replace(/\s/g, "");
  return a;
}

function isEqual(arr_1, arr_2) {
  if(arr_1.length != arr_2.length) return false;
  if(typeof(arr_1[0]) == 'string' & typeof(arr_2[0]) == 'string') {
    for(var i = 0; i < arr_1.length; i ++) {
      if(arr_1[i] != arr_2[i]) return false;
    }
    return true;
  } else {
      for(var i = 0; i < arr_1.length; i ++) {a = isEqual(arr_1[i],arr_2[i])};
      return a;
  };
};

var output = [""]
var command = "python";
var parameter = [path + "/python.py"];
        var result = spawn(command, parameter);
        var time_1 = 0;
        var result_0 = [];

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
              output.pop();
          } else output = data.toString().replace(/[\'\"\\\/\b\f\n\r\t]/g, '')
        })

        result.stderr.on('data', function(data) {
          console.log(data.toString())
          rmdir.rmdir(path);
        })
