#!/usr/bin/env bash -e

# Note: use lowercase names for the Docker images
DOCKER_IMAGE="benton/utility"
# "local" is the latest feature build, usually matching the code in a "feature" branch
DOCKER_TAG="$DOCKER_IMAGE:local"

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

    rm -fR out/compose

    mkdir -p out/compose

    rsync -av --exclude='out' \
              --exclude='scripts' \
              --exclude='Services/bin' \
              --exclude='Services/obj' \
              --exclude='WebServices/bin' \
              --exclude='WebService/obj' \
              ./ out/compose

    cp scripts/compose/.dockerignore              out/compose
    cp scripts/compose/docker-compose.yml         out/compose
    cp scripts/compose/Dockerfile                 out/compose
    cp scripts/compose/entry.sh                   out/compose

    cd out/compose/

    docker build --squash --compress --tag $DOCKER_TAG \
        --label "$DOCKER_LABEL2" --label "$DOCKER_LABEL3" .
}

build_docker_image

set +e