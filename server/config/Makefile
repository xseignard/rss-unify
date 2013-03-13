TESTS = $(shell find ../test/ -name "*.test.js")

test:
	mocha -R xunit $(TESTS)

coverage:
	jscoverage --no-highlight ../src/ ../src-cov
	TEST_COV=1 mocha -R html-cov $(TESTS) > coverage.html
	rm -rf ../src-cov

.PHONY: test coverage