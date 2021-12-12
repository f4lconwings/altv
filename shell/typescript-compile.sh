#!/bin/bash

set -e

cd ..
mkdir -p dist
rm -rf dist
cp -r bin dist

tsc -p src/client
echo "compiled client files"
tsc -p src/server
echo "compiled server files"

vite build