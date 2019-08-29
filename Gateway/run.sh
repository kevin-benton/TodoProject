#!/usr/bin/env bash

DOCKER_IMAGE="benton/api-gateway:testing"
PORT=8080 # PORT=80

set -e

echo Using port $PORT...
docker run -it -p $PORT:8080 $DOCKER_IMAGE

set +e
