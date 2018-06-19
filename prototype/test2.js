process.on('message', function(data) {
  var timeout = setTimeout(function() {
    process.send({message: "timeout"})
  }, data.time)
})
