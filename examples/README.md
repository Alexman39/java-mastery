# Executable Java examples

Fourteen standalone programs, each with a `main` method, designed to connect the course's conceptual lessons to code you can compile and run. Java 17 or later is recommended.

```bash
bash examples/run-all.sh
```

To run an individual example:

```bash
cd examples
javac -d /tmp/java-mastery-classes src/BinarySearch.java
java -cp /tmp/java-mastery-classes BinarySearch
```

Each expected output is checked byte-for-byte. Start by predicting the output **before** running it. Then change an input, predict the new output, and rerun the example. The reference and collection examples illustrate object identity and deterministic iteration order respectively. These are introductory runnable examples, not a complete executable example for every chapter.
