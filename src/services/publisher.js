const amqplib = require('amqplib');
const amqpUrl = process.env.RABBITMQ_URL || 'amqp://localhost:5673';

module.exports.publish = async (check) => {
  const connection = await amqplib.connect(amqp_url, 'heartbeat=60');
  const channel = await connection.createChannel();
  try {
    console.log('Publishing');
    const exchange = 'check.run_check';
    const queue = 'check.run_check';
    const routingKey = 'run_check';
    
    await channel.assertExchange(exchange, 'direct', {durable: true});
    await channel.assertQueue(queue, {durable: true});
    await channel.bindQueue(queue, exchange, routingKey);
    
    await channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(check)));
    console.log('Message published');
  } catch(e) {
    console.error('Error in publishing message', e);
  } finally {
    console.info('Closing channel and connection if available');
    await channel.close();
    await connection.close();
    console.info('Channel and connection closed');
  }
  process.exit(0);
}