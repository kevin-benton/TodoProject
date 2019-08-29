#!/bin/bash

set -e
run_cmd="dotnet WebService.dll"

for i in {1..7}; do
  >&2 echo "SQL Server is starting up"
  sleep 1;
done;

echo Connected!;

>&2 echo "SQL Server is up - executing command"
exec $run_cmd
