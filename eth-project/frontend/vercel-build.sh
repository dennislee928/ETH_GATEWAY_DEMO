#!/bin/bash
echo "Installing dependencies..."
npm install --legacy-peer-deps

echo "Building the application..."
CI=false npm run build

echo "Building the application..."
CI=false npm run build
