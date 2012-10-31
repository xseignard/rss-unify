// module exports
exports.findAll = findAll; 
exports.findByName = findByName;
exports.getFeed = getFeed;

// requires
var mongo = require('mongodb'),
	rssAggregator = require('../utils/rssAggregator'),
	logger = require('../logger/logger');

// module vars
var log = logger.getLogger(),
	db;

// mongodb uri
var uri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/topicsDB';

// connection to mongodb
mongo.Db.connect (uri, function (err, database) { 
	log.info('Connecting to the db...');
    if (err) {
		log.info('Error during connection. Aborting.');
		process.exit(1);
	}
	log.info('Connected');
	db = database
});

/**
 * Find all topics
 * @param req - the request being sent
 * @param res - the response : should be all topics
 */
function findAll(req, res) {
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
function findByName(req, res) {
    var name = req.params.name;
    var callback = function(err, topic) {
    	if (topic) {
    		res.send(topic);
    	}
    	else {
    		res.status(404).send({error: 'Topic not found'});
    	}
    };
    findTopicByName(name, callback);
};

/**
 * Get the aggregated feed
 * @param req - the request being sent
 * @param res - the response
 */
function getFeed(req, res) {
	// 1 minute timeout to get enough time for the request to be processed
	req.connection.setTimeout(60*1000); 	
	
	var name = req.params.name;
	var callback = function(err, topic) {
    	// if the topic has been found
		if (topic) {
			// aggregate the corresponding feeds
    		rssAggregator.aggregate(topic, 
    			function(err, rssFeed) {
    				if (err) {
	    				res.status(500).send({error: 'Error while creating feed'});
	    			}
	    			else {
	    				res.send(rssFeed);
	    			}
	    		},
	    		req);
    	}
    	else {
    		res.status(404).send({error: 'Topic not found'});
    	}
    };
    findTopicByName(name, callback);
}

/**
 * Convenient method to get a topic by name.
 * 
 * @param name - the name of the topic to find
 * @param callback - callback that will handle the requested topic (or the lack of it).
 */
function findTopicByName(name, callback) {
	log.info('Retrieving name: ' + name);
    db.collection('topics', function(err, collection) {
        collection.findOne({'name':name}, callback);
    });
}