#!/bin/bash

COVERAGE=$(jq .total.statements.pct coverage/coverage-summary.json)

if [ "$(echo "${COVERAGE} < 95.0" | bc)" -eq 1 ]; then
  exit 1
fi