var fs = require('fs');
var spawn = require('child_process').spawn;
var rmdir = require('./utils/rmdir');
var toSingle = require('./utils/functions').toSingleArray;

process.on('message', function(data) {
      //console.log(data.input)
      var inputArr = data.input;
      var code = data.code;

      if(code.match(/input\((.*)\)?/g) != null) {
        code = code.replace(/input\((.*[^\)])\)/g, 'input("")');
      };

      var foldername = data.date + "_" + "python";
      var path = "./prototype/compileFolder/" + foldername;
      fs.mkdirSync(path);
      fs.writeFileSync(path + "/" + "python.py", code);

      var command = "python";
      var parameter = [path + "/python.py"];
      var result = spawn(command, parameter);
      var output;

      result.stdin.setEncoding('utf-8');
      //console.log(inputArr)
      if(typeof(inputArr) != 'object') result.stdin.write(inputArr.toString().replace(/[\'\"\\\/\b\f\n\r\t]/g, '') + "\n")
      else {
        inputArr.forEach(function(item) {
          result.stdin.write(item.toString().replace(/[\f\n\r\t]/g, '') + "\n");
        })
      }
      result.stdin.end()

      result.on('exit', function(code, signal) {
          result.kill();
          rmdir.rmdir(path);
          //output = toSingle(output);
          process.send({result: output});
      })

      result.stdout.on('data', function(data) {
          //console.log(data.toString());
          if(data.toString().match(/[\[\]\(\)\{\}]/) == null) {
              console.log(data.toString());
              output = data.toString().replace(/[\f\r\t]/g, '').split("\n")
              if(output.length != 1 & output.length != 0) output.pop();
          } else output = data.toString().replace(/[\f\n\r\t]/g, '')
      });

      result.stderr.on('data', function(data) {
          console.log(data.toString())
          output = data.toString().replace(/[\b\f\r\t]/g, '');
          rmdir.rmdir(path);
          process.send({result: output});
      })

})
