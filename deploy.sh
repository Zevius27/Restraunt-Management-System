#!/bin/bash

# Navigate to the frontend folder, install dependencies, and start dev server
echo "Installing frontend dependencies..."
cd frontend && npm install

echo "Starting frontend dev server..."
npm run dev &  # Running frontend dev server in the background

# Navigate to the backend folder, install dependencies, and start dev server
echo "Installing backend dependencies..."
cd ../backend && npm install

echo "Starting backend dev server..."
npm run dev &  # Running backend dev server in the background

# Wait for both servers to start
wait
