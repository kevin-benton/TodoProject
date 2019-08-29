#!/usr/bin/env bash

if [[ -z "$BENTON_UTILITY_PORT" ]]; then
    echo "Error: the BENTON_UTILITY_PORT environment variable is not defined."
    exit -1
fi

if [[ -z "$BENTON_UTILITY_SQL_CONNNECTION_STRING" ]]; then
    echo "Error: the BENTON_UTILITY_SQL_CONNNECTION_STRING environment variable is not defined."
    exit -1
fi
