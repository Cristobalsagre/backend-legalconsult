const amqp = require('amqplib');

let channel;

const connectToBus = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
  }
};

const publishMessage = async (queue, message) => {
  try {
    if (!channel) {
      console.error('No RabbitMQ channel available');
      return;
    }
    await channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(message));
    console.log('Message sent to queue ${queue}:', message);
  } catch (error) {
    console.error('Error publishing message:', error);
  }
};

const consumeMessage = async (queue, callback) => {
  try {
    if (!channel) {
      console.error('No RabbitMQ channel available');
      return;
    }
    await channel.assertQueue(queue, { durable: false });
    channel.consume(queue, (msg) => {
      if (msg !== null) {
        console.log('Message received from queue ${queue}:', msg.content.toString());
        callback(msg.content.toString());
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('Error consuming message:', error);
  }
};

module.exports = { connectToBus, publishMessage, consumeMessage };