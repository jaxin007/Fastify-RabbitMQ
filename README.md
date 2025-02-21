# **Fastify and RabbitMQ Documentation**

## **Project Description**

This project is a backend service built with Fastify, designed to make async log and add his to queue and add tod b for save this log.

---

## **Requirements**

- Node.js (version >= 18)
- Fastify (version >= 5.2)
- RabbitMQ (version >= 4)
- pino (version >= 9.6)
- MySQL (version >= 8)
- Docker (if using containerization)
---

## **Environment Configuration**
Create a .env file in the root directory with the following variables:
 ```bash
PORT=3000

DDB_HOST=mysql-logger
DB_PORT=3306
DB_USER=log_user
DB_PASSWORD=logpassword
DB_NAME=log_system

RABBITMQ_URL=amqp://localhost

DATABASE_URL="mysql://log_user:logpassword@mysql-logger:3306/log-system"
```
## **Running the Project**
Locally
Install dependencies:

```bash
 npm install
```
Start the development server:

```bash
 npm run start:dev
```
The server will be available at http://localhost:3000.

## **With Docker**

Ensure Docker is installed and running.

Create a docker-compose.yml file (if not already created).

Build and start the container:

```bash
 docker-compose up --build
```

## **Endpoints**

**POST**
```bash
 http://localhost:3000/log
```

for create a new log you must write in body(raw json) event_type and message for log.
it`s sample.

```bash
{
  "event_type": "ERROR",
  "message": "This is a test log message"
}
```
if you want get all logs  use this endpoint.

**GET**
```bash
 http://localhost:3000/logs
```
