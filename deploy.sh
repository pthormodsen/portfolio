#!/bin/bash

set -e

echo "Pulling latest changes..."
git pull

echo "Rebuilding portfolio..."
docker compose up -d --build

echo "Container status:"
docker compose ps

echo "Deployment complete."