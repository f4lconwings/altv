#!/bin/bash

set -e

cd ..
mkdir -p dist
rm -rf dist
cp -r bin dist

tsc -p src/server
echo "compiled server files"
tsc -p src/client
echo "compiled client files"
vite build
echo "compiled interface files"