var fork = require('child_process').fork
var child = fork('./test.js')
var a = "a"

child.on('message', function(data) {
    a = data.message;
    child.kill()
})

child.send({hello: "hello"})

console.log(a)
