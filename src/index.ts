import fastify from 'fastify';
import fastifyMysql from '@fastify/mysql';
import dotenv from 'dotenv';
import logRoutes from './routes/logs';

dotenv.config();

const app = fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true
            }
        }
    }
});

app.register(fastifyMysql, {
    promise: true,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

app.register(logRoutes);

app.listen({ host: '0.0.0.0', port: Number(process.env.PORT) }, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    app.log.info(`Server running at ${address}`);
});
