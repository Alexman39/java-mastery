#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p out
javac -d out src/main/java/masty/practice/Practice.java src/test/java/masty/practice/PracticeTest.java
java -cp out masty.practice.PracticeTest "$@"
