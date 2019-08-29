#!/usr/bin/env bash -e

APP_HOME="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. && cd .. && pwd )/"
source "$APP_HOME/scripts/.functions.sh"

remove_sql_container() {
  check_dependency_docker

  docker stop sql1
  docker rm sql1
}

remove_sql_container

set +e
