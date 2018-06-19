var fork = require('child_process').fork
var child = fork('./test.js')
var child_2 = fork('./test2.js')
var a = "a"

child.on('message', function(data) {
    a = data.message;
    child.kill()
    child_2.kill()
    console.log(a)
})

child.send({hello: "hello"})

child_2.on('message', function(data) {
    child.kill()
    child_2.kill()
    console.log("killed")
})

child_2.send({time: 5000});
