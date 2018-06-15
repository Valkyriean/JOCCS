var spawn = require('child_process').spawn;

// var py = spawnSync("python", ["TestCases/Python/Case_1/test.py"], {input:"a"})
// console.log(py.stdout.toString())
var result = "a"

process.on('message', function(data) {
  var child = spawn("python", ["../../prototype/TestCases/Python/Case_1/test.py"])

  child.on('exit', function(code, signal) {
      child.kill();
      process.send({message: result})
  })

  child.stdin.setEncoding('utf-8');
  child.stdin.write("'" + "a" + "'" + "\n");
  child.stdin.end();

  child.stdout.on('data', function(data) {
      result = data.toString();
  })

  child.stderr.on('data', function(data) {
      result = data.toString();
  })
})

//process.send({message: result})
