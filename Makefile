TESTS = $(shell find test -name "*.test.js")

test:
	@./node_modules/.bin/mocha -R spec $(TESTS)

coverage:
	jscoverage --no-highlight modules modules-cov
	TEST_COV=1 mocha -R html-cov $(TESTS) > coverage.html
	rm -rf modules-cov

.PHONY: test coverage