# Fintech Platform

## Overview
A basic fintech platform for managing user accounts and performing transactions like deposits and withdrawals. Built with Node.js, Hasura, HTML, CSS, and JavaScript.

## Features
- User account management
- Deposit and withdrawal transactions
- Secure payment processing with Visa, MasterCard, and American Express
- Interactive and user-friendly frontend

## Tech Stack
- **Backend:** Node.js, Express
- **Database:** PostgreSQL (with Hasura)
- **Frontend:** HTML, CSS, JavaScript

## Prerequisites
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Hasura CLI](https://hasura.io/docs/latest/graphql/core/hasura-cli/install-hasura-cli.html)
- PostgreSQL

## Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/fintech-platform.git
cd fintech-platform
2. Install Backend Dependencies
bash
cd backend
npm install
3. Run Backend Server
bash
node server.js
4. Set Up Hasura
Start Docker and run Hasura with PostgreSQL
bash
docker-compose up -d
Apply migrations and metadata
bash
hasura migrate apply --all-databases
hasura metadata apply
5. Run Frontend
Open index.html in your browser to access the frontend.

Usage
Access the backend at http://localhost:3000
Access Hasura console at http://localhost:8080
Access the frontend by opening index.html in your browser
