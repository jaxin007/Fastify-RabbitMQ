import fastifyMysql from '@fastify/mysql';
import { FastifyInstance } from 'fastify';

export default async function dbConnector(fastify: FastifyInstance) {
    fastify.register(fastifyMysql, {
        promise: true,
        connectionString: `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
    });

    fastify.addHook('onReady', async () => {
        const db = fastify.mysql;
        if (!db) {
            throw new Error('MySQL connection not established');
        }
        console.log('MySQL connected successfully');
    });
}
