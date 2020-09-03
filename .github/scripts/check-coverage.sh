#!/bin/bash

COVERAGE=$(jq .total.statements.pct coverage/coverage-summary.json)

if [ "$(echo "${COVERAGE} < 90.0" | bc)" -eq 1 ]; then
  echo "Statement coverage for tests should be at least 90%"
  exit 1
fi