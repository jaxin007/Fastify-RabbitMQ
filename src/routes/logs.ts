import { FastifyInstance } from 'fastify';
import { sendLogToQueue } from '../services/rabbitmq';

interface LogRequestBody {
    event_type: string;
    message: string;
}

export default async function logRoutes(fastify: FastifyInstance) {
    fastify.post('/log', async (request, reply) => {
        request.log.info('Received log request', request.body);

        const { event_type, message } = request.body as LogRequestBody;
        if (!event_type || !message) {
            request.log.warn('Missing event_type or message');
            return reply.status(400).send({ error: 'event_type and message are required' });
        }

        await sendLogToQueue(JSON.stringify({ event_type, message }));
        request.log.info(`Log sent to RabbitMQ: ${event_type} - ${message}`);

        const db = fastify.mysql;
        if (!db) {
            request.log.error('MySQL connection not available');
            return reply.status(500).send({ error: 'MySQL connection not available' });
        }

        const query = 'INSERT INTO event_logs (event_type, message) VALUES (?, ?)';
        const values = [event_type, message];

        await db.query(query, values);
        request.log.info('Log saved to database');

        reply.send({ status: 'Log sent to RabbitMQ and saved in database' });
    });

    fastify.get('/logs', async (request, reply) => {
        request.log.info('Fetching logs from database');

        const db = fastify.mysql;
        if (!db) {
            request.log.error('MySQL connection not available');
            return reply.status(500).send({ error: 'MySQL connection not available' });
        }

        const query = 'SELECT id, event_type, message, created_at FROM event_logs ORDER BY created_at DESC';
        const [logs] = await db.query(query);

        request.log.info(`Fetched ${logs.length} logs from database`);
        reply.send(logs);
    });
}
