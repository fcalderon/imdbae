#!/bin/bash

export PORT=5120

cd ~/www/imdbae
./bin/imdbae stop || true
./bin/imdbae start
