// var a = [1,"",2,"","",4]
// var counter = 0;
//
// a.forEach(function(item) {
//     if(item == ""){
//         counter += 1;
//     };
// });
//
// while(counter > 0) {
//     a.splice(a.indexOf(""),1);
//     counter -= 1;
// };

// var code = "//abc\n//abc\nabc"
//
// code = code.replace(/\/\*(\s|.)*?\*\//g, "");
// code = code.replace(/\/\/(\s|.)*?\n/g,"")
//
// console.log(code);

var spawn = require('child_process').spawn;
var result;
var child = spawn("python3", ["TestCases/Python/Case_1/test.py"])

child.on('exit', function(code, signal) {
    child.kill();
    console.log(result)
})

var a = "2"

child.stdin.setEncoding('utf-8');
child.stdin.write(a + "\n");
child.stdin.write(a + "\n");
child.stdin.end();

child.stdout.on('data', function(data) {
    result = data.toString();
    console.log("a")
})

child.stderr.on('data', function(data) {
    result = data.toString();
})
//
// var a = "-12.5"
// var b;
// try{
//     b = +a;
//     console.log(typeof(b));
//     console.log(b)
//     if(isNaN(b)) console.log("a")
// } catch{
//     console.log(a);
// }
