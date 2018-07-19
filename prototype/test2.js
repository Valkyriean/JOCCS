var amqp = require('amqp')

var connection = amqp.createConnection({url: "amqp://admin:admin:@127.0.0.1:5672"})


// var exchOption = {
//     type: "topic",
//     durable: true,
//     autoDelete: false,
//     confirm: false
// }

connection.on("ready", function() {
    console.log("fuck")
    console.log("ready");
    var callback = false;
    var exch = connection.exchange("topic", {type: 'direct', autoDelete: false})
    connection.queue("queue1", {autoDelete: false}, function(quene) {
        queue.bind("topic", "queue1", function() {
            exchange.publish('queue1', 'test message');
            callback = true;
            setTimeout(function() {
                console.log("single queue bind successed");
                connection.end();
                connection.destroy()
            }, 5000);
        });
        queue.subscribe(function(message) {
            console.log("message is" + message.data.toString());
        })
    });
});
