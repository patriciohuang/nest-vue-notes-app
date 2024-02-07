#!/bin/bash

# Install nestjs cli dependency globally
npm i -g @nestjs/cli

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Read environment variables from .env file
export $(grep -v '^#' .env | xargs)

# Connect to MySQL server and create new database
echo "Creating database ${DB_DATABASE}..."
mysql -u${DB_USERNAME} -p${DB_PASSWORD} -e "CREATE DATABASE IF NOT EXISTS ${DB_DATABASE};"

# Return to the root directory
cd ..