#!/bin/bash

set -e

echo "Pulling latest changes..."
git pull

echo "Pulling latest images..."
docker compose pull

echo "Starting portfolio..."
docker compose up -d

echo "Container status:"
docker compose ps

echo "Deployment complete."
