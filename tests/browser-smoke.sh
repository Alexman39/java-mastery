#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
BROWSER="$(command -v chromium || command -v chromium-browser || command -v google-chrome || true)"
if [[ -z "$BROWSER" ]]; then echo 'Chromium/Chrome required for browser smoke test' >&2; exit 1; fi
PORT=18761
python3 -m http.server "$PORT" --bind 127.0.0.1 >/dev/null 2>&1 &
SERVER=$!
trap 'kill "$SERVER" 2>/dev/null || true' EXIT
sleep 1
for route in '#home' '#lesson-0' '#lesson-1'; do
  DOM="$(timeout 25 "$BROWSER" --headless --no-sandbox --disable-gpu --disable-dev-shm-usage --disable-background-networking --virtual-time-budget=2000 --dump-dom "http://127.0.0.1:$PORT/$route" 2>/dev/null)"
  [[ "$DOM" == *'JAVA MASTERY'* ]] || { echo "FAIL: shell $route"; exit 1; }
  if [[ "$route" == '#home' ]]; then
    [[ "$DOM" == *'Interactive lab: trace a loop'* ]] || { echo 'FAIL: overview lab'; exit 1; }
  else
    [[ "$DOM" == *'Run a complete Java example'* ]] || { echo "FAIL: runnable example $route"; exit 1; }
  fi
  echo "PASS: $route"
done
