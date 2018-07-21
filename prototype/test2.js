const amqp = require('amqplib');
const uuid = require('uuid/v4');
const EventEmitter = require('events');
const host = "amqps://rabbitmq:rabbitmq@localhost";
var express = require('express');
var router = express.Router();
var queue = null;
var channel = null;

const amqpCon = amqp.connect(host);
amqpCon
  .then(conn => conn.createChannel(),err => console.log(err))
  .then((ch) => {
      channel = ch;
      ch.assertQueue('', {
          exclusive: true,
          expires: 5000,
          autoDelete: true
      }).then((q)=> {
          queue = q;
          channel.responseEmitter = new EventEmitter();
          channel.consume(queue.queue, (msg) => {
              const result = msg.content.tostring();
              channel.responseEmitter.emit(msg.properties.correlationId, result);
          });
      });
  });

router.get('/test', function(req, res, next) {
    const corr = uuid();
    const sentToQueue = 'test_pub_sub_rpc';
    const content = "hello world";
    channel.sendToQueue(sendToQueue, new Buffer(content), {
        correlationId: corr,
        replyTo: queue.queue,
    });

    channel.responseEmitter.once(corr, function(data){
        res.send(data);
    });
});
