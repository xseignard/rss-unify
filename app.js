// requires
var app = require('express')(),
	// mongo
	MONGO_URL = require('./lib/conf/conf').MONGO_URL,
	MongoClient = require('mongodb').MongoClient,
	//redis
	REDIS_URL = require('./lib/conf/conf').REDIS_URL,
	redis = require('redis-url').connect(REDIS_URL),
	// modules
	TopicsRoutes = require('./lib/routes/topicsRoutes'),
	Cache = require('./lib/core/cache');
	
	
// get the db connection
MongoClient.connect(MONGO_URL, function(err, db) {
	db.collection('topics', function(err, collection) {		
		collection.find().toArray(function(err, topics) {
			// error handling
			if (err) throw err;
			
			// start caching (updated every 10mins in this case)
			var cache = new Cache(topics, redis);
			cache.cacheFeeds(10);
			
			var routes = new TopicsRoutes(db, redis);
			// routes
			app.get('/', routes.findAll);
			app.get('/:name', routes.findByName);
			app.get('/:name/rss', routes.getFeed);

			// start app
			var port = process.env.PORT || 5000;
			app.listen(port);
			console.log('Listening on port ' + port);
		});
	});
});

