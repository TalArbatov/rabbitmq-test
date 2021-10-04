const express = require('express');
const amqp= require('amqplib/callback_api');
const app = express();

const QUEUE_NAME = 'my_queue';
let active_channel;

amqp.connect('amqp://localhost', (err, connection) => {
    if (err) console.log(err);
    
    connection.createChannel((er, channel) => {
        channel.assertQueue(QUEUE_NAME);
        active_channel = channel;
    })
})

app.use('/test', (req, res) => {
    res.send('success!');
})

app.use('/send', (req, res) => {
    active_channel.sendToQueue(QUEUE_NAME, Buffer.from('Hello world1'));
    res.send('successfuly send message to queue');
})

app.listen(5000, () => {
    console.log('listening at 5000');
})