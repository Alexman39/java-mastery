# Instructor-only validation fixture

`Practice.java` here is a reference implementation used **only** to check the test harness. It is not the learner's starter file. Avoid reading it until you have completed the exercises yourself.

Run `bash practice/validation/validate-harness.sh` from the project root. The script compiles the fixture in a temporary directory, confirms all 16 tests pass, then intentionally breaks `isPrime` and confirms that the test suite rejects the faulty implementation. No learner files are modified.
