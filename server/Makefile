MOCHA=node_modules/.bin/mocha
ISTANBUL=node_modules/.bin/istanbul
JSHINT=node_modules/.bin/jshint

TESTS=$(shell find test/ -name "*.test.js")

clean:
	rm -rf reports

test:
	$(MOCHA) -R spec $(TESTS)

xunit:
	@# check if reports folder exists, if not create it
	@test -d reports || mkdir reports
	export XUNIT_FILE="reports/TESTS-xunit.xml"; \
	$(MOCHA) -R xunit-file $(TESTS)

coverage:
	@# check if reports folder exists, if not create it
	@test -d reports || mkdir reports
	$(ISTANBUL) instrument --output src-cov src
	@# move original src code and replace it by the instrumented one
	mv src src-orig && mv src-cov src
	@# tell istanbul to only generate the lcov file
	ISTANBUL_REPORTERS=lcovonly $(MOCHA) -R mocha-istanbul $(TESTS)
	@# place the lcov report in the report folder, remove instrumented code
	@# and reput src at its place
	mv lcov.info reports/coverage.lcov
	rm -rf src
	mv src-orig src

cobertura: coverage
	python tools/lcov_cobertura.py reports/coverage.lcov -b src -o reports/coverage.xml

jshint:
	$(JSHINT) src test --show-non-errors

checkstyle:
	@# check if reports folder exists, if not create it
	@test -d reports || mkdir reports
	$(JSHINT) src test --reporter=checkstyle > reports/checkstyle.xml

sonar:
	@# add the sonar sonar-runner executable to the PATH and run it
	PATH="$$PWD/tools/sonar-runner-2.1/bin:$$PATH" sonar-runner

ci: clean xunit coverage cobertura checkstyle sonar

.PHONY: test coverage xunit jshint checkstyle sonar