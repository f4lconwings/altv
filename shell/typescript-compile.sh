#!/bin/bash

set -e

echo "compiling project..."

cd ..
mkdir -p dist
rm -rf dist
cp -r bin dist

tsc -p src/server
echo "compiled server files"
cp src/server/.env dist
tsc -p src/client
echo "compiled client files"
vite build
echo "compiled interface files"