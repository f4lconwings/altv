#!/bin/bash

if [ "$1" = "release" ] || [ "$1" = "rc" ] || [ "$1" = "dev" ]; then 
    echo "Downloading newest updates"
else
    echo "Invalid parameter, try 'release', 'rc' or 'dev'"
    exit 1
fi

cd ../bin

curl -o server.exe https://cdn.altv.mp/server/$1/x64_win32/altv-server.exe
    echo "Server loaded"

mkdir -p modules/js-module && cd $_
curl --remote-name-all https://cdn.altv.mp/js-module/$1/x64_win32/modules/js-module/{js-module,libnode}.dll
    echo "Js module loaded"
cd ../..

mkdir -p data && cd $_
curl --remote-name-all https://cdn.altv.mp/server/$1/x64_win32/data/{vehmodels,vehmods,clothes}.bin
    echo "Vehicle binaries and clothes loaded"
cd ..

exit 0