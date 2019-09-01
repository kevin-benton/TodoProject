#!/usr/bin/env bash -e

# Note: use lowercase names for the Docker images
DOCKER_IMAGE="benton/api-gateway"
# "testing" is the latest dev build, usually matching the code in the "development" branch
DOCKER_TAG="$DOCKER_IMAGE:testing"

# Debug|Release
CONFIGURATION=Release

APP_HOME="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. && cd .. && pwd )/"
source "$APP_HOME/scripts/.functions.sh"

build_docker_image() {
    check_dependency_docker
    check_dependency_git

    cd $APP_HOME

    DOCKER_LABEL2="Commit=$(git log --pretty=format:'%H' -n 1)"
    DOCKER_LABEL3="Date=$(/usr/bin/env date +%Y-%m-%dT%H:%M:%S)"

    rm -fR out/docker

    mkdir -p out/docker

    rsync -av --exclude='out' \
              --exclude='scripts' \
              --exclude='node_modules' \
              ./ out/docker

    cp scripts/docker/.dockerignore              out/docker
    cp scripts/docker/Dockerfile                 out/docker

    cd out/docker/

    docker build --squash --compress --tag $DOCKER_TAG \
        --label "$DOCKER_LABEL2" --label "$DOCKER_LABEL3" .
}

build_docker_image

set +e