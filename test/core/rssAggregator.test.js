var libpath = process.env.TEST_COV ? 'modules-cov' : 'modules',
	assert = require('assert'),
	RssAggregator = require('../../'+ libpath +'/core/rssAggregator');

var testTopic = {
	name : 'js',
	description : 'html5/js feeds',
	feeds : ['http://rss.badassjs.com']
};

	
describe('RssAggregator', function() {
  
	describe('#aggregate()', function() {
		it('should call a callback', function(done) {
			var callback = function(key, feed) {
				assert.equal(testTopic.name, key);
				done();
			};
			RssAggregator.aggregate(testTopic, callback);
		});
	});
	
	describe('#createAggregatedFeed()', function() {
		it('should return a rss feed with the right meta', function() {
			var feed = RssAggregator.createAggregatedFeed(testTopic, []);
			assert.notEqual(-1, feed.title.indexOf(testTopic.name));
			assert.notEqual(-1, feed.feed_url.indexOf(testTopic.name));
			assert.equal(testTopic.description, feed.description);
		});
	});
  
	describe('#processProperty()', function() {
		it('should return the given property', function() {
			assert.equal('test', RssAggregator.processProperty('test'));
		});
		it('should return "missing" if nothing is given', function() {
			assert.equal('missing', RssAggregator.processProperty());
		});
	});
});