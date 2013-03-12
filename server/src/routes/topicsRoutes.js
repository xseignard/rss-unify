var TopicsRoutes = function(repo, cacheService) {
	
	var conf = require('../conf/conf');
	
	/**
	 * Find all topics
	 * @param req - the request being sent
	 * @param res - the response : should be all topics
	 */
	var _index= function(req, res) {
		repo.all(function(topics) {
			if (!topics || topics.length === 0) {
				res.status(404).send({error: 'No topics found'});
			}
			else {
				res.send(topics);
			}
		});
	};
	
	/**
	 * Find a topic by its name
	 * @param req - the request being sent
	 * @param res - the response
	 */
	var _topic = function(req, res) {
		// topic name
		var name = req.params.name;
		// get the topic feed from cache
		cacheService.get(name, function(err, feed) {
			if (err || !feed) {
				res.status(404).send({error: 'Feed not found'});
			}
			else {
				res.send(JSON.parse(feed));
			}
		});
	};
	
	/**
	 * Get the aggregated feed
	 * @param req - the request being sent
	 * @param res - the response
	 */
	var _feed = function(req, res) {
		// topic name
		var name = req.params.name;
		// get the topic feed from cache
		cacheService.get(name + '/rss', function(err, feed) {
			if (err || !feed) {
				res.status(404).send({error: 'Feed not found'});
			}
			else {
				res.send(feed);
			}
		});
	};
	
	/**
	 * Redirect to the api the serves the rss feed
	 * @param req - the request being sent
	 * @param res - the response
	 */
	var _redirectToFeed = function(req, res) {
		// topic name
		var name = req.params.name;
		// redirect to the api
		res.redirect(conf.API_PREFIX + '/' + name + '/rss');
	};
	
	/**
	 * Find the topic details
	 * @param req - the request being sent
	 * @param res - the response
	 */
	var _details = function(req, res) {
		// topic name
		var name = req.params.name;
		repo.one({'name':name}, function(topic) {
			if (topic) {
				res.send(topic);
			} 
			else {
				res.status(404).send({error: 'Topic not found'});
			}
		});
	};
	
	/**
	 *
	 */
	var _newTopic = function(req, res) {
		// if the request is valid
		if (req.body && req.body.name && req.body.description && req.body.feeds.length > 0) {
			// store the feed
			repo.newOne(req.body, function(err, item) {
				if (err) res.status(500).send({error: 'Someting went wrong'});
				// insertion ok, cache the feed
				cacheService.cacheFeed(req.body, function() {
					res.send(item);
				});
			});
		}
		else {
			// request is not valid
			res.status(500).send({error: 'Someting went wrong'});
		}
	};
	
	return {
		index          : _index,
		topic          : _topic,
		feed           : _feed,
		redirectToFeed : _redirectToFeed,
		details        : _details,
		newTopic       : _newTopic
	};
};

module.exports = TopicsRoutes;