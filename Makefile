TESTS = $(shell find test -name "*.test.js")

test:
	@./node_modules/.bin/mocha -R spec $(TESTS)

coverage:
	jscoverage --no-highlight lib lib-cov
	TEST_COV=1 mocha -R html-cov $(TESTS) > coverage.html
	rm -rf lib-cov

.PHONY: test coverage