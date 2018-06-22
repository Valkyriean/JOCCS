var fs = require('fs');
var spawn = require('child_process').spawn;
var rmdir = require('./utils/rmdir');

process.on('message', function(data) {

    var code = data.code;
    var unitTest = data.unitTest;

    if(code.match())

})
