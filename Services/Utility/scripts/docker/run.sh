#!/usr/bin/env bash -e

# Note: use lowercase names for the Docker images
DOCKER_IMAGE="benton/utility"

APP_HOME="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. && cd .. && pwd )/"
source "$APP_HOME/scripts/.functions.sh"

run_container() {
    check_dependency_docker

    $APP_HOME/scripts/env-vars-check.sh

    echo "Starting Benton Utility..."
    docker run -it -p 8080:80 \
        -e CSG_SQL_CONNNECTION_STRING \
        "$DOCKER_IMAGE:testing"
}

run_container
