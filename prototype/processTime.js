process.on('message', function(data) {
  var timeout = setTimeout(function() {
    process.send({message: "taking too much time"})
  }, data.time)
})
