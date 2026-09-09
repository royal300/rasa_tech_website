#!/bin/bash

# ==============================================================================
# RASA Tech Website - Deployment Script
# 
# Domain: https://rasatech.in
# VPS IP: 93.127.206.52
# VPS Path: /root/rasa_tech
# ==============================================================================

set -e

echo "=========================================="
echo "  RASA Tech - Deploying to VPS..."
echo "=========================================="

cd /root/rasa_tech

echo "[1/5] Pulling latest code from GitHub..."
git pull origin main

echo "[2/5] Installing project dependencies..."
npm install

echo "[3/5] Building production bundle..."
NITRO_PRESET=node-server npm run build

echo "[4/5] Preparing server runtime..."
cd /root/rasa_tech/.output && npm install --omit=dev

echo "[5/5] Restarting PM2 process and reloading Nginx..."
PORT=3070 HOST=127.0.0.1 pm2 restart rasa_tech || cd /root/rasa_tech/.output && PORT=3070 HOST=127.0.0.1 pm2 start server/index.mjs --name rasa_tech --cwd /root/rasa_tech/.output
nginx -t && systemctl reload nginx

echo ""
echo "=========================================="
echo "  Deployment Successful!"
echo "  Live URL: https://rasatech.in"
echo "=========================================="