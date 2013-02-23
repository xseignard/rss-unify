var Cache = function(topics, redis) {
	// modules
	var RssAggregator = require('./rssAggregator')();
	var suffix = '/rss';
	
	/**
	 * Cache the feeds on a regular given interval in hours
	 * @param interval - the interval in minutes
	 */
	var _cacheFeeds = function(interval) {
		// the interval in milliseconds
		var intervalInMillis = interval * 1000 * 60;
		// first caching
		_cache();
		// repeatedly call that to re-aggregate the feed
		setInterval(Cache.cache, intervalInMillis);
	};

	/**
	 * Cache feeds
	 */
	var _cache = function(callback) {
		var storeIt = function(key, feed) {
			// remove previous cached version (if existing) and store the new one on redis
			// the feed is stored in two representations:
			// - json : to be easily rendered on the client
			// - xml/rss : the rss feed that will be served
			redis.del(key, redis.print);
			redis.del(key + suffix, redis.print);
			redis.set(key, JSON.stringify(feed), redis.print);
			redis.set(key + suffix, feed.xml(), redis.print);
			if (callback) callback();
		};
		// cache aggregated feed for each topic
		for(var i=0; i<topics.length; i++) {
			RssAggregator.aggregate(topics[i], storeIt);
		}
	};
	
	return {
		cacheFeeds : _cacheFeeds,
		cache      : _cache
	};
};

// module exports
module.exports = Cache;
