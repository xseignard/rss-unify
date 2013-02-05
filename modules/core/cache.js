// module exports
exports.cacheFeeds = cacheFeeds;

// module vars
var rssAggregator = require('./rssAggregator'),
	MongoClient = require('mongodb').MongoClient;

// mongodb uri
var uri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/topicsDB';

/**
 * Cache the feeds on a regular given interval in hours
 * @param interval - the interval in minutes
 */
function cacheFeeds(interval) {
	// the interval in milliseconds
	var intervalInMillis = interval * 1000 * 60;
	// first caching
	cache();
	// repeatedly call that to re-aggregate the feed
	setInterval(cache, intervalInMillis);
}

/**
 * Cache feeds
 */
function cache() {
	MongoClient.connect(uri, function(err, db) {
	  console.log('Connecting to the db...');
	    if (err) {
	    	console.log('Error during connection. Aborting.');
			process.exit(1);
		}
	    console.log('Connected');
		db.collection('topics', function(err, collection) {		
			collection.find().toArray(function(err,items) {
				// cache aggregated feed for each topic
				for(var i=0; i<items.length; i++) {
					rssAggregator.aggregate(items[i]);
				}
				db.close();
			});
		});
	});
}