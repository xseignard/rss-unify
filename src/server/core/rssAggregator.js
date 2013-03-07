var RssAggregator = function(){
	// module vars
	var feedparser = require('feedparser'),
		RSS = require('rss'),
		async = require('async'),
		// conf oject
		conf = require('../conf/conf'),
		// default number of feed items to render
		NUMBER_OF_ITEMS = 20;

	/**
	 * Agreggate the feeds of the given topic
	 * @param topic - the topic to aggregate
	 * @param callback - the function that will deal with the feed
	 */
	var _aggregate = function(topic, callback) {	
		// array of all articles from all feeds of a given topic
		var items = [];
		// async fetch of each feed
		async.forEach(
			// iterated array
			topic.feeds,
			// function applied to each item of the array
			function(feedUrl, callback) {
				_parseAndProcessFeed(feedUrl, items, callback);
			},
			// called after all iteration are done, or when an error occurs
			function(err) {
				// sort items by date
				items.sort(function(a, b) {
					return (Date.parse(b.date) - Date.parse(a.date));
				});
				// create the feed
				var rssFeed = _createAggregatedFeed(topic, items);
				callback(topic.name, rssFeed);
			}
		);
	};

	/**
	 * Parse and process a feed
	 * @param feedUrl - the url to parse
	 * @param items - the array of rss items to aggregate
	 * @param callback - the callback which is called to indicate async lib that the parsing of this feed is done
	 */
	var _parseAndProcessFeed = function(feedUrl, items, callback) {
		var now = new Date();
		var item;
		// when parsing is finished, iterate over articles to store them in an array of all articles of all streams
		feedparser.parseUrl(feedUrl)
		.on('complete', function onComplete(meta, articles) {
			for (var i in articles) {
				// some people put a future date as the pubDate of their articles to stay on top of aggregated feeds, fuck them
				if (now > Date.parse(articles[i].date)) {
					// if author not present, take the one from meta, or else the title
					articles[i].author = articles[i].author || meta.author || meta.title;
					items.push(articles[i]);
				}
			}
			// tell async that this parse and process is finished
			callback();
		})
		//error handling
		.on('error', function onError(error) {
			// do nothing
			callback();
		});
	};

	/**
	 * Create the aggregated feed
	 * @param topic - the topic document of the searched feed
	 * @param items - the array of rss items to aggregate
	 * @returns the object representation of the aggregated feed
	 */
	var _createAggregatedFeed = function(topic, items) {
		// create the feed
		var feed = new RSS({
			title: 'Aggregated feed about ' + topic.name,
			description: topic.description,
			feed_url: conf.URL + conf.API_PREFIX + '/' + topic.name + '/rss',
			site_url: conf.URL,
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
				title:  _processProperty(items[i].title),
				description: _processProperty(items[i].summary),
				url: _processProperty(items[i].link), 
				author: _processProperty(items[i].author), 
				date: _processProperty(items[i].date)
			});
		}
		// return the feed object
		return feed;
	};

	/**
	 * Convenience function to process missing properties
	 * @return the property if it exists, or 'missing'
	 */
	var _processProperty = function(property) {
		return property ? property : 'missing';
	};
	
	return {
		aggregate : _aggregate,
		parseAndProcessFeed : _parseAndProcessFeed,
		createAggregatedFeed : _createAggregatedFeed,
		processProperty : _processProperty
	};
};

// module exports
module.exports = RssAggregator;