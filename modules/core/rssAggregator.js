// module exports
exports.aggregate = aggregate;

// module vars
var feedparser = require('feedparser'),
	RSS = require('rss'),
	async = require('async'),
	// redis url
	REDIS_URL = process.env.REDISTOGO_URL || 'redis://localhost:6379',
	// app URL
	URL = process.env.URL || 'http://localhost:8080/',
	redis = require('redis-url').connect(REDIS_URL),
	// default number of feed items to render
	NUMBER_OF_ITEMS = 20;


/**
 * Agreggate the feeds of the given topic
 * @param topic - the topic to aggregate
 */
function aggregate(topic) {	
	// array of all articles from all feeds of a given topic
	var items = [];
	// async fetch of each feed
	async.forEach(
		// iterated array
		topic.feeds,
		// function applied to each item of the array
		function(feedUrl, callback) {
			parseAndProcessFeed(feedUrl, items, callback);
		},
		// called after all iteration are done, or when an error occurs
		function(err) {
			// sort items by date
			items.sort(function(a, b) {
			    return (Date.parse(b.date) - Date.parse(a.date));
			});
			// create the feed
			var rssFeed = createAggregatedFeed(topic, items);
			// remove previous cached version (if existing) and store the new one on redis
			redis.del(topic.name, redis.print);
			redis.set(topic.name, rssFeed, redis.print);
		}
	);
}

/**
 * Parse and process a feed
 * @param feedUrl - the url to parse
 * @param items - the array of rss items to aggregate
 * @param callback - the callback which is called to indicate async lib that the parsing of this feed is done
 */
function parseAndProcessFeed(feedUrl, items, callback) {
	var now = new Date();
	var item;
	// when parsing is finished, iterate over articles to store them in an array of all articles of all streams
	feedparser.parseUrl(feedUrl).on('complete', function onComplete(meta, articles) {
		for (var i in articles) {
			// some people put a future date as the pubDate of their articles to stay on top of aggregated feeds, fuck them
			if (now > Date.parse(articles[i].date)) {
				items.push(articles[i]);
			}
		}
		// tell async that this parse and process is finished
		callback();
	});
}

/**
 * Create the aggregated feed
 * @param topic - the topic document of the searched feed
 * @param items - the array of rss items to aggregate
 * @returns the xml representation of the aggregated feed
 */
function createAggregatedFeed(topic, items) {
	// create the feed
	var feed = new RSS({
		title: 'Aggregated feed about ' + topic.name,
        description: topic.description,
        feed_url: URL + topic.name + '/rss',
        site_url: URL,
        author: 'Made with rss-unify (https://github.com/xseignard/rss-unify)'
	});
	// number of requested feed items (defaults to 20)
	// if there is less than 20 feed items, set the according number
	var numberOfItems = NUMBER_OF_ITEMS;
	if(items.length < numberOfItems) {
		numberOfItems = items.length;
	}
	// get the 'numberOfItems' first rss items to create the feed
	for (var i=0; i<numberOfItems; i++) {
		feed.item({
			title:  processProperty(items[i].title),
			description: processProperty(items[i].summary),
			url: processProperty(items[i].link), 
			author: processProperty(items[i].author), 
			date: processProperty(items[i].date)
		});
	}
	// return the xml feed
	return feed.xml();
}

/**
 * Convenience function to process missing properties
 * @return the property if it exists, or 'missing'
 */
function processProperty(property) {
	if (property) {
		return property;
	}
	else {
		return 'missing';
	}
}