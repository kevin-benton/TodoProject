#!/usr/bin/env bash -e

APP_HOME="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. && cd .. && pwd )/"
source "$APP_HOME/scripts/.functions.sh"

run_container() {
    check_dependency_docker

    cd $APP_HOME

    echo "Starting buckman/utility ..."

    cd out/compose/

    docker-compose up
}

run_container
