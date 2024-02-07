# huang-b40d4c

## Pre-requisites
Please make sure you have this pre-requisistes installed:
- Node v18
- MySQL 8.3
- mysql-client

## Important: Before Setup

Please configure your host, port, username, password, and database for MySQL in a `.env` file inside `backend/` directory. For example:

```
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=mypassword
DB_DATABASE=huang-b40d4c
```

## Setup

Run
```
bash ./setup.sh
```

## Run

To run the app locally we need to run 2 separate commands in 2 separate terminal instances:

For the backend:

```
cd backend
npm run start:dev
```

For the frontend:

```
cd frontend
npm run dev
```

## Build for production

Build the frontend, this puts the output inside the `backend/public` directory.

```
cd frontend
npm run build
```

Then run the backend normally.
