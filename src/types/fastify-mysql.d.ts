import { FastifyMysql } from '@fastify/mysql';
import 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    mysql: FastifyMysql;
  }
}
