var fs = require('fs');
var spawn = require('child_process').spawn;
var rmdir = require('./utils/rmdir');

var input_0 = fs.readFileSync('./package/input.txt').toString();
var input_1 = input_0.split("\r\n");
input_1.pop();
var inputArr = [];
var input_2 = [];

input_1.forEach(function(item) {
  item = trimSpace(item);
  input_2 = item.split(",");
  inputArr.push(input_2);
})

var output_0 = fs.readFileSync('./package/output.txt').toString().trim();
var output_1 = input_0.split("\r\n");
output_1.pop();
var outputArr = [];
var output_2 = [];

output_1.forEach(function(item) {
  item = trimSpace(item);
  output_2 = item.split(",");
  outputArr.push(output_2);
})

var code = fs.readFileSync('test.py').toString();
var res = code.match(/input\((.*)\)/g);
var res_0 = res[0].replace(/\((.*)\)/, '("")');
code = code.replace(/input\((.*)\)/g, res_0);
//console.log(code);

var foldername = new Date().getTime() + "_" + "python";
var path = "compileFolder/" + foldername
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

function abc(input, time, result) {
    var actualResult = result;
    if (time < input.length) {
        var command = "python";
        var parameter = [path + "/python.py"];
        var result = spawn(command, parameter);
        var time_1 = 0;
        var result_0 = [];

        result.stdin.setEncoding('utf-8');

        input[time].forEach(function(item) {
          result.stdin.write("'" + item.toString().replace(/[\'\"\\\/\b\f\n\r\t]/g, '') + "'" + "\n");
        })

        result.stdin.end()

        //write(input[time], time_1);

        result.on('exit', function(code, signal) {
          result.kill();
          abc(input, time + 1, actualResult);
        })

        result.stdout.on('data', function(data) {
          console.log(data.toString());
          result_0 = data.toString().split("\r\n");
          result_0.pop();
          actualResult.push(result_0);
        })

        result.stderr.on('data', function(data) {
          console.log(data.toString())
        })
  } else {
    //return result to server
    rmdir.rmdir(path);
    actualResult.splice(0,1);
    var equal = isEqual(actualResult, outputArr);
    console.log(equal);
  }
}

var time = 0;
var result = [[]];

var a = abc(inputArr, time, result);
