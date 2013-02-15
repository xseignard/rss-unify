// module vars
var RssAggregator = require('./rssAggregator'),
	MongoClient = require('mongodb').MongoClient,
	// redis url
	REDIS_URL = process.env.REDISTOGO_URL || 'redis://localhost:6379',
	// redis client
	redis = require('redis-url').connect(REDIS_URL),
	MONGO_URL = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/topicsDB';

var Cache = {};

/**
 * Cache the feeds on a regular given interval in hours
 * @param interval - the interval in minutes
 */
Cache.cacheFeeds = function(interval) {
	// the interval in milliseconds
	var intervalInMillis = interval * 1000 * 60;
	// first caching
	Cache.cache();
	// repeatedly call that to re-aggregate the feed
	setInterval(Cache.cache, intervalInMillis);
};

/**
 * Cache feeds
 */
Cache.cache = function() {
	MongoClient.connect(MONGO_URL, function(err, db) {
	  console.log('Connecting to the db...');
	    if (err) {
			console.log('Error during connection. Aborting.');
			process.exit(1);
		}
	    console.log('Connected');
		db.collection('topics', function(err, collection) {		
			collection.find().toArray(function(err,items) {
				// callback that deals with redis caching
				var callback = function(key, feed) {
					// remove previous cached version (if existing) and store the new one on redis
					redis.del(key, redis.print);
					redis.set(key, feed, redis.print);
				};
				// cache aggregated feed for each topic
				for(var i=0; i<items.length; i++) {
					RssAggregator.aggregate(items[i], callback);
				}
				db.close();
			});
		});
	});
};

// module exports
module.exports = Cache;
