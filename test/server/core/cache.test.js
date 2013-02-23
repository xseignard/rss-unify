var libpath = process.env.TEST_COV ? 'server-cov' : 'server',
    assert = require('assert'),
	Cache = require('../../../src/'+ libpath +'/core/cache');

var testTopics = [
	{
		name : 'js',
		description : 'html5/js feeds',
		feeds : []
	}
];

// simple redis mock
var redisMock = require('../mocks/store.mock');
	
describe('Cache', function() {
  
	describe('#cache()', function() {
		it('should store the topic in cache with the following key: ' + testTopics[0].name, function(done) {
			var cache = new Cache(testTopics, redisMock);
			cache.cache(function() {
				assert.notEqual(redisMock.get(testTopics[0].name), undefined);
				done();
			});
		});
		it('should store the topic in cache with the following key: ' + testTopics[0].name + '/rss', function(done) {
			var cache = new Cache(testTopics, redisMock);
			cache.cache(function() {
				assert.notEqual(redisMock.get(testTopics[0].name + '/rss'), undefined);
				done();
			});
		});
	});
});