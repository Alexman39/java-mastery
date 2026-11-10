#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
OUT="$(mktemp -d)"
trap 'rm -rf "$OUT"' EXIT
javac -encoding UTF-8 -d "$OUT" src/*.java
count=0
for fixture in expected/*.txt; do
  class="$(basename "$fixture" .txt)"
  java -cp "$OUT" "$class" > "$OUT/actual.txt"
  diff -u "$fixture" "$OUT/actual.txt"
  echo "PASS $class"
  count=$((count+1))
done
echo "PASS: $count runnable examples"
