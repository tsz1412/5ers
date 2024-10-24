# Project Overview

This project consists of two main services: `backend` and `dashboard`. The `backend` is built using NestJS, and the `dashboard` is a React application. Both services are containerized using Docker.

## Setup Instructions

### 1. Environment Configuration

For both `backend` and `dashboard` services, you need to create a `.env` file based on the provided `.env.example` files.

#### Backend

1. Navigate to the `backend` directory:
    ```sh
    cd backend
    ```
2. Copy the `.env.example` to `.env`:
    ```sh
    cp .env.example .env
    ```
3. Update the `.env` file with the necessary environment variables.

#### Dashboard

1. Navigate to the `dashboard` directory:
    ```sh
    cd dashboard
    ```
2. Copy the `.env.example` to `.env`:
    ```sh
    cp .env.example .env
    ```
3. Update the `.env` file with the necessary environment variables, including creating a token for [Financial Modeling Prep API](https://financialmodelingprep.com/api/v3/).

### 2. Users and Passwords for Testing

The following users and passwords are created by the seeder for testing purposes:

- **User 1**
  - Username: `israel_israeli`
  - Password: `password123`
- **User 2**
  - Username: `eli_cohen`
  - Password: `securePass`

You can add more users during the seeding proccess by modifing seeder.service.ts file

### 3. Running the Services with Docker

To run the services using Docker, follow these steps:

1. Ensure Docker is installed on your machine.
2. Navigate to the <strong><u>backend</u></strong> directory and run `npm i` and `npm run build` to create initial required files required for running the backend service
3. Navigate to the <strong><u>dashboard</u></strong> directory and run `npm i` and `npm run build` to create initial required files required for running the backend service
4. Navigate to the root directory of the project where the `docker-compose.yml` file is located.
5. Run the following command to build and start the services:
    ```sh
    docker-compose up --build
    ```

This will start the `backend`, `dashboard`, and `mongo` services as defined in the `docker-compose.yml` file.

### 4. Accessing the Services

- **Backend**: The backend service will be available at `http://localhost:3000`.
- **Dashboard**: The dashboard service will be available at `http://localhost:3001`.

## Additional Information

- Ensure you have created a token for [Financial Modeling Prep API](https://financialmodelingprep.com/api/v3/) and added it to the `REACT_APP_STOCK_API_TOKEN` variable in the `dashboard/.env` file.
- For more detailed information on the backend and dashboard services, refer to their respective `README.md` files located in the `backend` and `dashboard` directories.