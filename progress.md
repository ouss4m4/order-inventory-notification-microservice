# FABA Node.js Developer Technical Assessment - Task Breakdown

## 🧩 Setup & Planning (Hours 1–2)

- [ ] Set up monorepo for each microservice (Order, Inventory, Notification)
- [ ] Initialize services using Node.js (v18+) and TypeScript
- [ ] Configure Docker for each service
- [ ] Set up RabbitMQ or Kafka with persistent storage and UI
- [ ] Set up MongoDB or Postgres with persistent storage
- [ ] Define shared message schema for events (`order.created`, `inventory.status.updated`, etc.)
- [ ] Configure environment variables and base configs for all services

## 🔁 Basic Event Flow (Hours 3–4)

- [ ] Implement `Order Service` to publish `order.created` event
- [ ] Implement `Inventory Service` to consume `order.created`, check availability, and emit `inventory.status.updated`
- [ ] Implement `Notification Service` to consume events and emit `notification.sent`
- [ ] Add event handlers for basic message flow
- [ ] Add error handling for each service (e.g., missing fields, invalid types)

## ⚠️ Resilience & Robustness (Hours 5–6)

- [ ] Add retry mechanisms for message processing
- [ ] Implement idempotency logic to prevent duplicate handling
- [ ] Set up Dead Letter Queues (DLQ) for failed messages
- [ ] Add support for event storage (e.g., Mongo/Postgres collections)
- [ ] Implement versioning for events (e.g., v1, v2 schemas)
- [ ] Build replay logic for historical events

## ✅ Testing & Documentation (Hours 7–8)

- [ ] Write unit tests for core logic in all services
- [ ] Add health check endpoints
- [ ] Add logs for major operations and failures
- [ ] Document architecture and microservice boundaries
- [ ] Document message queue setup and event schemas
- [ ] Document how to run and test the system locally using Docker

## 🧪 Evaluation Criteria Coverage

- [ ] ✅ Message Queue: schema, flow, retries, DLQ, ordering
- [ ] ✅ System Design: service boundaries, patterns, scalability, fault tolerance
- [ ] ✅ Code Quality: clean TypeScript, logging, error handling, tests
- [ ] ✅ Documentation: setup, architecture, event flow
