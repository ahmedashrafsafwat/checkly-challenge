const amqplib = require('amqplib');
const amqpUrl = process.env.AMQP_URL || 'amqp://localhost:5673';
require('../models')
const CheckMetrics = require('../models/checkMetrics')
async function processMessage(check) {
  //call your email service here to send the email
  await new Promise(resolve => {setTimeout(async () => {

    // after the check is complete
    check.endTime = new Date();

    // calculate the response time in milisecond and add that to the the check meterics history
    check.responseTime = check.endTime.getTime() - check.startTime.getTime()
    await CheckMetrics.create({
        checkId: check._id,
        responseTime: check.responseTime
    });

    resolve;
  }, 1000)});
}

(async () => {
    const connection = await amqplib.connect(amqpUrl, "heartbeat=60");
    const channel = await connection.createChannel();
    channel.prefetch(10);
    const queue = 'check.run_check';
    process.once('SIGINT', async () => { 
      console.log('got sigint, closing connection');
      await channel.close();
      await connection.close(); 
      process.exit(0);
    });

    await channel.assertQueue(queue, {durable: true});
    await channel.consume(queue, async (check) => {
      console.log('processing messages');      
      await processMessage(check);
      await channel.ack(check);
    }, 
    {
      noAck: false,
      consumerTag: 'check_runner'
    });
    console.log(" [*] Waiting for messages. To exit press CTRL+C");
})();