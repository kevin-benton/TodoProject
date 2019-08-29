#!/usr/bin/env bash -e

# Usage:
# Run the service in the local environment:  ./scripts/run

# Debug|Release
CONFIGURATION=Release

APP_HOME="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. && pwd )/"
source "$APP_HOME/scripts/.functions.sh"

run() {
    check_dependency_dotnet
    ./scripts/env-vars-check.sh

    cd $APP_HOME
    dotnet restore --verbosity=quiet

    dotnet run --configuration $CONFIGURATION --project WebService/*.csproj
}

run

set +e
