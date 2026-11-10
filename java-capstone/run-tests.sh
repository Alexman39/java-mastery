#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p out
javac -d out src/main/java/masty/GraphSearch.java src/test/java/masty/GraphSearchTest.java
java -cp out masty.GraphSearchTest
