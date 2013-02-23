TESTS = $(shell find ../test/server -name "*.test.js")

test:
	@../node_modules/.bin/mocha -R spec $(TESTS);../node_modules/.bin/testacular start --single-run --browsers PhantomJS

coverage:
	jscoverage --no-highlight ../src/server ../src/server-cov
	TEST_COV=1 mocha -R html-cov $(TESTS) > coverage.html
	rm -rf ../src/server-cov

.PHONY: test coverage