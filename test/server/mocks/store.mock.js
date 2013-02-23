// simple store mock
var StoreMock = function() {
	var cache = {};
	
	var _set = function(key, value) {
		cache[key] = value;
	};
	
	var _get = function(key) {
		return cache[key];
	};
	
	var _del = function(key) {
		if(cache[key]) delete cache[key];
	};
	
	return {
		get : _get,
		set : _set,
		del : _del
	};
}();

module.exports = StoreMock;