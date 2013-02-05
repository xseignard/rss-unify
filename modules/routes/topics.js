// module exports
exports.findAll = findAll; 
exports.findByName = findByName;
exports.getFeed = getFeed;

// requires
var MongoClient = require('mongodb').MongoClient,
	rssAggregator = require('../core/rssAggregator'),
	redis = require('redis'),
    client = redis.createClient();

// module vars
var db;

// mongodb uri
var uri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/topicsDB';

// connection to mongodb
MongoClient.connect(uri, function(err, database) {
	console.log('Connecting to the db...');
    if (err) {
    	console.log('Error during connection. Aborting.');
		process.exit(1);
	}
	console.log('Connected');
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
    // topic name
	var name = req.params.name;
    // call when the topic has been searched in the db
	var callback = function(err, topic) {
    	if (topic) {
    		res.send(topic);
    	}
    	else {
    		res.status(404).send({error: 'Topic not found'});
    	}
    };
    return findTopicByName(name, callback);
};

/**
 * Get the aggregated feed
 * @param req - the request being sent
 * @param res - the response
 */
function getFeed(req, res) {
	// topic name
	var name = req.params.name;
	// get the topic feed from redis cache
	client.get(name, function(err, feed) {
		if (err || !feed) {
	    	res.status(404).send({error: 'Feed/Topic not found'});
	    }
	    else {
	    	res.send(feed);
	    }
	});
}

/**
 * Convenient method to get a topic by name.
 * @param name - the name of the topic to find
 * @param callback - callback that will handle the requested topic (or the lack of it).
 */
function findTopicByName(name, callback) {
	console.log('Retrieving name: ' + name);
    db.collection('topics', function(err, collection) {
        collection.findOne({'name':name}, callback);
    });
}