#!/usr/bin/env bash -e

# Note: use lowercase names for the Docker images
DOCKER_IMAGE="benton/api-gateway"

APP_HOME="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. && cd .. && pwd )/"
source "$APP_HOME/scripts/.functions.sh"

run_container() {
    check_dependency_docker

    echo "Starting Benton API Gateway..."
    docker run -it -p 9000:9000 \
        "$DOCKER_IMAGE:testing"
}

run_container
