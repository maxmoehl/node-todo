#!/bin/bash

COVERAGE=$(jq .total.statements.pct coverage/coverage-summary.json)

if [ "$(echo "${COVERAGE} < 75.0" | bc)" -eq 1 ]; then
  echo "Statement coverage for tests should be at least 75% but is $COVERAGE%"
  exit 1
fi