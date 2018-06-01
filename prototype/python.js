var fs = require('fs');
var spawn = require('child_process').spawn;
var rmdir = require('./utils/rmdir');

var command = "python";
var parameter = ["test.py"];
var result = spawn(command,parameter);

var output = [[]];

function abc(input, time, output) {
  var time_1 = 0;
  var output_1 = output;
  if (time < arr.length) {
    var command = "python";
    var parameter = ["test.py"];
    var result = spwan(command, parameter);

    result.stdin.setEncoding('utf-8');
    write(input[time_1], time_1);

    result.on('exit', function(code, signal) {
      result.kill();
      abc(input, time + 1, output_1);
    })

    result.stdout.on('data', function(data) {
      console.log(data.toString())
    })

    result.stderr.on('data', function(data) {
      console.log(data.toString())
    })


  }
}

function write(input, time) {
  if(time < input.length) {

        result.stdin.resume();
        result.stdin.write("'" + input[time].toString().replace(/[\'\"\\\/\b\f\n\r\t]/g, '') + "'" + "\n");
        result.stdin.pause();
        write(input, time + 1);

  } else {
    result.stdin.end();
  }
}

result.on('exit', function(code, signal) {
    result.kill()
})

var a = "hello";
var input = ["hello", 2];
var time = 0;
var num = 0

result.stdin.setEncoding('utf-8');

write(input, time);

/*result.stdin.setEncoding('utf-8');
result.stdin.write("'" + a + "'" + '\n');
result.stdin.write("2" + '\n')
result.stdin.end();*/



result.stdout.on('data', function(data) {
    console.log(data.toString());
    console.log(num)
    num += 1;
})

result.stderr.on('data', function(data) {
    console.log(data.toString());
})
