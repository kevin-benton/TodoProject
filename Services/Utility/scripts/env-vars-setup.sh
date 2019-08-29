#!/usr/bin/env bash

# Prepare the environment variables used by the application.

export BENTON_UTILITY_PORT=9001

# SQL connection string
export BENTON_UTILITY_SQL_CONNNECTION_STRING="Server=tcp:localhost,1433;Initial Catalog=utility;Persist Security Info=False;User ID=sa;Password=testPass1;MultipleActiveResultSets=False;Connection Timeout=30;"
