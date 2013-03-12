define(function() {
	
	// regex to check url validity (borrowed from angular input[url] directive)
	var _URL_REGEXP = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;

	/**
	 * Check if a value is a valid url
	 * @param value {string} - the value to check
	 * @return true if valid, false else
	 */
	var _urlIsValid = function(value) {
		if (!value || value.length === 0  || _URL_REGEXP.test(value)) {
			return true;
		}
		else {
			return false;
		}
	};
	
	/** 
	 * Check if the input value is a string composed of one valid url per line (i.e. '\n' separator)
	 * @param value {string} - the value to check
	 * @return true if valid, false els
	 */
	var _urlsAreValid = function(value) {
		if (!value) return false;
		var urls = value.split('\n');
		var valid = true;
		for (var i = 0; i < urls.length; i++) {
			valid = valid && _urlIsValid(urls[i]);
		}
		return valid;
	};
	
	return {
		URL_REGEXP   : _URL_REGEXP,
		urlIsValid   : _urlIsValid,
		urlsAreValid : _urlsAreValid
	};
});