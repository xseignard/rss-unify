var CacheService = function(redis) {
	// modules
	var RssAggregator = require('./rssAggregator')();
	
	/**
	 * Cache each feed corresponding to the each given topic.
	 * @param topics {array} - array of topic objects to aggregate and put in cache
	 * @param callback {function} - to be called after all caching is done (optional)
	 */
	var _cacheFeeds = function(topics, callback) {
		console.log('Updating cache...');
		var l = topics.length;
		var allCached = function() {
			// track how many topic has been parsed
			// when all are parsed, execute the provided callback
			l--;
			if (l === 0) {
				console.log('Cached all');
				if (callback) callback();
			}
		};
		
		// cache aggregated feed for each topic
		for(var i=0; i<topics.length; i++) {
			_cacheFeed(topics[i], allCached);
		}
	};

	/**
	 * Cache the feed corresponding to the given topic.
	 * @param topic {object} - the topic to aggregate and put in cache
	 * @param callback {function} - to be called after caching is done (optional)
	 */
	var _cacheFeed = function(topic, callback) {
		var storeIt = function(key, feed) {
			var suffix = '/rss';
			// remove previous cached version (if existing) and store the new one on redis
			// the feed is stored in two representations:
			// - json : to be easily rendered on the client
			// - xml/rss : the rss feed that will be served
			_del(key);
			_del(key + suffix);
			_set(key, JSON.stringify(feed));
			_set(key + suffix, feed.xml());
			console.log('Cache for ' + key + ' updated');
			if (callback) callback();
		};
		RssAggregator.aggregate(topic, storeIt);
	};
	
	/**
	 * Get from cache
	 * @param key {string} - the key of the value to get
	 * @param callback {function} - called after getting in cache
	 * @return {object} the corresponding value
	 */
	var _get = function(key, callback) {
		redis.get(key, callback);
	};
	 
	/**
	 * Set to cache
	 * @param key {string} - the key of the value to store
	 * @param value {object} - value to store
	 */
	var _set = function(key, value) {
		redis.set(key, value, redis.print);
	};
	
	/**
	 * Delete from cache
	 * @param key {string} - the key of the value to delete
	 */
	var _del = function(key) {
		redis.del(key, redis.print);
	};
	
	return {
		cacheFeeds : _cacheFeeds,
		cacheFeed  : _cacheFeed,
		get        : _get,
		set        : _set,
		del        : _del
	};
};

// module exports
module.exports = CacheService;
