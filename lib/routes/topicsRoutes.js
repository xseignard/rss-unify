var TopicsRoutes = function(repo, cache) {
	
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
		cache.get(name, function(err, feed) {
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
		cache.get(name + '/rss', function(err, feed) {
			if (err || !feed) {
				res.status(404).send({error: 'Feed not found'});
		    }
		    else {
				res.send(feed);
		    }
		});
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
	
	return {
		index   : _index,
		topic   : _topic,
		feed    : _feed,
		details : _details
	};
};

module.exports = TopicsRoutes;