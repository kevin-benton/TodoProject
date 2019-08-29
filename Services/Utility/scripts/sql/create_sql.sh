#!/usr/bin/env bash -e

APP_HOME="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. && cd .. && pwd )/"
source "$APP_HOME/scripts/.functions.sh"

create_sql_container() {
  check_dependency_docker

  docker pull microsoft/mssql-server-linux:latest
  docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=testPass1' -p 1433:1433 --name sql1 -d microsoft/mssql-server-linux:latest
}

create_sql_container

set +e
