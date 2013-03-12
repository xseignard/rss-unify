TESTS = $(shell find ../test/ -name "*.test.js")

test:
	@../node_modules/.bin/mocha -R spec $(TESTS)
	grunt jshint

coverage:
	jscoverage --no-highlight ../src/ ../src-cov
	TEST_COV=1 mocha -R html-cov $(TESTS) > coverage.html
	rm -rf ../src-cov

.PHONY: test coverage