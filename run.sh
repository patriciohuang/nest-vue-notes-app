#!/bin/bash

# Check if nvm is installed
if command -v nvm &> /dev/null
then
    # Install Node 22 if not installed
    if ! nvm ls | grep -q "v22"; then
        echo "Installing Node 22..."
        nvm install 22
    fi
    # Use Node 22
    nvm use 22
fi

# Confirm the Node version
echo "Node version is now:"
node -v

echo "Installing project dependencies..."

# Install nestjs cli dependency globally
npm i -g @nestjs/cli

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Return to the root directory
cd ..

(cd backend && npm run start:dev) & (cd frontend && npm run dev)
