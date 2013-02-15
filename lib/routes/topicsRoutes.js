var TopicsRoutes = function(db, redis){
	
	/**
	 * Find all topics
	 * @param req - the request being sent
	 * @param res - the response : should be all topics
	 */
	var _findAll= function(req, res) {
		db.collection('topics', function(err, collection) {
			collection.find().toArray(function(err, items) {
				res.send(items);
			});
		});
	};
	
	/**
	 * Find a topic by its name
	 * @param req - the request being sent
	 * @param res - the response
	 */
	var _findByName = function(req, res) {
	    // topic name
		var name = req.params.name;
	    console.log('Retrieving name: ' + name);
		db.collection('topics', function(err, collection) {
			collection.findOne({'name':name}, function(err, topic) {
				if (topic) {
					res.send(topic);
				}
				else {
					res.status(404).send({error: 'Topic not found'});
				}
			});
		});
	};
	
	/**
	 * Get the aggregated feed
	 * @param req - the request being sent
	 * @param res - the response
	 */
	var _getFeed = function(req, res) {
		// topic name
		var name = req.params.name;
		// get the topic feed from redis cache
		redis.get(name, function(err, feed) {
			if (err || !feed) {
				res.status(404).send({error: 'Feed/Topic not found'});
		    }
		    else {
				res.send(feed);
		    }
		});
	};
	
	return {
		findAll    : _findAll,
		findByName : _findByName,
		getFeed    : _getFeed
	};
};

module.exports = TopicsRoutes;