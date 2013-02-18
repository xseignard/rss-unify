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
	 * Get the aggregated feed
	 * @param req - the request being sent
	 * @param res - the response
	 */
	var _feed = function(req, res) {
		// topic name
		var name = req.params.name;
		// get the topic feed from cache
		cache.get(name, function(err, feed) {
			if (err || !feed) {
				res.status(404).send({error: 'Feed not found'});
		    }
		    else {
				res.send(feed);
		    }
		});
	};
	
	return {
		index : _index,
		topic : _topic,
		feed  : _feed
	};
};

module.exports = TopicsRoutes;