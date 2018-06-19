var fork = require('child_process').fork
var child = fork('./test.js')
var a = "a"

child.on('message', function(data) {
    a = data.message;
    child.kill()
    child_2.kill()
    console.log(a)
})

child.send({hello: "hello"})

var child_2 = fork('./test2.js')

child_2.on('message', function(data) {
    child.kill()
    child_2.kill()
    console.log(data.message)
})

child_2.send({time: 5000});
