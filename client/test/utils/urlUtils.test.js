define(['utils/urlUtils'], function(urlUtils) {
	
	var validUrl = 'http://test.com';
	var invalidUrl = 'toto';
	var validUrls = 'http://test.com' + String.fromCharCode(10);
	validUrls += 'https://another.org' + String.fromCharCode(10);
	validUrls += 'ftp://zboub.net';
	
	describe('urlUtils', function() {
	
        // testing the urlIsValid function
        describe('urlIsValid', function() {
            it('"http://test.com" should be a valid url and "toto" and invalid one', function() {
                expect(urlUtils.urlIsValid(validUrl)).toBe(true);
				expect(urlUtils.urlIsValid(invalidUrl)).toBe(false);
            });
        });

        // testing the urlsAreValid function
        describe('urlsAreValid', function() {
            it('these ones should be valid', function() {
                expect(urlUtils.urlsAreValid(validUrl)).toBe(true);
				expect(urlUtils.urlsAreValid(validUrls)).toBe(true);
            });
            it('this one should be invalid', function() {
                expect(urlUtils.urlsAreValid(invalidUrl)).toBe(false);
            });
        });
	});

});