var libpath = process.env.TEST_COV ? 'modules-cov' : 'modules',
    assert = require('assert'),
	Cache = require('../../'+ libpath +'/core/cache');

var testTopics = [
	{
		name : 'js',
		description : 'html5/js feeds',
		feeds : []
	}
];

// simple redis mock
var redisMock = function() {
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
	
describe('Cache', function() {
  
	describe('#cache()', function() {
		it('should store the topic in cache', function(done) {
			var cache = new Cache(testTopics, redisMock);
			cache.cache(function() {
				assert.notEqual(redisMock.get(testTopics[0].name), undefined);
				done();
			});
			
		});
	});
});