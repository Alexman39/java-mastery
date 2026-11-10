#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../../"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
mkdir -p "$tmp/src/masty/practice" "$tmp/classes"
cp practice/validation/Practice.java "$tmp/src/masty/practice/Practice.java"
javac -d "$tmp/classes" "$tmp/src/masty/practice/Practice.java" practice/src/test/java/masty/practice/PracticeTest.java
java -cp "$tmp/classes" masty.practice.PracticeTest --require-complete | tee "$tmp/pass.log"
grep -q 'RESULT: 16 passed, 0 failed, 0 TODO' "$tmp/pass.log"
python3 - "$tmp/src/masty/practice/Practice.java" <<'PY2'
from pathlib import Path
import sys
p=Path(sys.argv[1]);s=p.read_text();s=s.replace('if (n < 2) return false;', 'if (n < 2) return true;',1);p.write_text(s)
PY2
javac -d "$tmp/classes" "$tmp/src/masty/practice/Practice.java" practice/src/test/java/masty/practice/PracticeTest.java
if java -cp "$tmp/classes" masty.practice.PracticeTest --require-complete > "$tmp/fail.log"; then
  echo 'ERROR: incorrect implementation was accepted' >&2; exit 1
fi
grep -q '^FAIL prime: boundaries' "$tmp/fail.log"
echo 'VALIDATED: correct solution passes; intentionally incorrect solution fails.'
