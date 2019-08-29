#!/usr/bin/env bash -e

# Usage:
# Build the project in the local environment:  ./scripts/build

# Debug|Release
CONFIGURATION=Release

APP_HOME="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. && pwd )/"
source "$APP_HOME/scripts/.functions.sh"

compile() {
    check_dependency_dotnet

    cd $APP_HOME
    ./scripts/env-vars-check.sh

    header "Downloading dependencies..."
    dotnet restore

    header "Compiling code..."
    dotnet build --configuration $CONFIGURATION
}

run_tests() {
    check_dependency_dotnet

    cd $APP_HOME
    header "Running tests..."
    PROJECTS=$(dotnet sln list | grep 'csproj$' | grep '\.Test')
    for PROJ in $PROJECTS; do
        echo "-- $PROJ"
        dotnet test --configuration $CONFIGURATION $PROJ
    done
}

# workaround for https://github.com/dotnet/cli/issues/3995
unset home

compile
run_tests

set +e