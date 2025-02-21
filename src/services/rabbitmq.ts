import amqp from 'amqplib';
import pino from 'pino';

const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: { colorize: true }
    }
});

export async function sendLogToQueue(logMessage: string) {
    logger.info({ logMessage }, '[RabbitMQ] Connecting to queue');

    const connection = await amqp.connect(process.env.RABBITMQ_URL!);
    const channel = await connection.createChannel();

    const queue = 'logs';
    await channel.assertQueue(queue, { durable: true });

    channel.sendToQueue(queue, Buffer.from(logMessage));
    logger.info({ logMessage }, '[RabbitMQ] Log sent to queue');

    await channel.close();
    await connection.close();

    logger.info('[RabbitMQ] Connection closed');
}
