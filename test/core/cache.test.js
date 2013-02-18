var libpath = process.env.TEST_COV ? 'lib-cov' : 'lib',
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
var redisMock = require('../mocks/store.mock');
	
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