# nest-vue-notes-app

## Pre-requisites
- Node v22

## Setup and run

A script is included to setup nvm, node and all the dependencies, and run both the backend and frontend automatically
```
bash ./run.sh
```

## Run manually

To run the app locally we need to run 2 separate commands in 2 separate terminal instances:

For the backend:

```
cd backend
nvm use
npm run start:dev
```

For the frontend:

```
cd frontend
nvm use
npm run dev
```

## Build for production

Build the frontend, this puts the output inside the `backend/public` directory.

```
cd frontend
nvm use
npm run build
```

Then run the backend normally.
