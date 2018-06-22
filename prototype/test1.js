var fork = require('child_process').fork
var child = fork('./unitTestingPython.js')
var a = "a"

child.on('message', function(data) {
    a = data.message;
    child.kill()
    child_2.kill()
    console.log(data.result)
})

child.send({
    code: "def abc(): \n    return 1",
    unitTest: "import unittest \nclass UnitTests(unittest.TestCase): \n    def test_1(self): \n        self.assertEqual(abc(),1) \n    def test_2(self): \n        self.assertEqual(abc(),2)"
  })

var child_2 = fork('./test2.js')

child_2.on('message', function(data) {
    child.kill()
    child_2.kill()
    console.log(data.message)
})

child_2.send({time: 5000});
