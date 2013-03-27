TESTS = $(shell find ../test/ -name "*.test.js")
MOCHA = ../node_modules/.bin/mocha
test:
	mocha -R spec $(TESTS)

coverage:
	jscover ../src/ ../src-cov
	TEST_COV=1 $(MOCHA) -R mocha-cobertura-reporter $(TESTS) > coverage.xml
	sed -i '1,2d' coverage.xml
	test -d ../reports || mkdir ../reports
	mv coverage.xml ../reports/coverage.xml
	rm -rf ../src-cov

checkstyle:
	test -d ../reports || mkdir ../reports
	jshint src --reporter=checkstyle > ../reports/checkstyle.xml

.PHONY: test coverage