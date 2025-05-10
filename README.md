# FABA Microservices

A microservices-based e-commerce system with Order, Inventory, and Notification services.

## Services

- **Order Service**: Handles order creation and management
- **Inventory Service**: Manages product inventory and stock levels
- **Notification Service**: Handles customer notifications

## Tech Stack

- Node.js (v18+)
- TypeScript
- Express.js
- MongoDB
- RabbitMQ
- Docker

## Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   cd services/order-service && npm install
   cd ../inventory-service && npm install
   cd ../notification-service && npm install
   ```
3. Start the services:
   ```bash
   docker-compose up
   ```

## Service Ports

- Order Service: http://localhost:3001
- Inventory Service: http://localhost:3002
- Notification Service: http://localhost:3003
- RabbitMQ Management: http://localhost:15672
- MongoDB Instances: 27017, 27018, 27019

## Environment Variables

Each service has its own `.env` file with specific configurations. See individual service READMEs for details.
