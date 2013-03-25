TESTS = $(shell find ../test/ -name "*.test.js")
MOCHA = ../node_modules/.bin/mocha
test:
	mocha -R xunit $(TESTS)

coverage:
	jscoverage --no-highlight ../src/ ../src-cov
	TEST_COV=1 $(MOCHA) -R mocha-cobertura-reporter $(TESTS) > coverage.xml
	sed -i '1,2d' coverage.xml
	rm -rf ../src-cov

.PHONY: test coverage