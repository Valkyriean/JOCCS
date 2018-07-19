var amqp = require('amqp')

var connection = amqp.createConnection({url: "amqp://admin:admin@127.0.0.1:5672"})

var bStop = false;

connection.on('ready', function() {
    connection.quene('topic', {durable: true, autoDelete: false}, function(queue) {
        queue.bind("topic", "topic");
        queue.subscribe(function(message, header, deliveryInfo) {
            console.log(message.data.toString());
        })
    })
})
