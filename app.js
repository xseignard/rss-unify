// requires
var app = require('express')(),
	// mongo
	MONGO_URL = require('./lib/conf/conf').MONGO_URL,
	topicsRepo = require('./lib/core/repository')(MONGO_URL, 'topics'),
	//redis
	REDIS_URL = require('./lib/conf/conf').REDIS_URL,
	redis = require('redis-url').connect(REDIS_URL),
	// modules
	TopicsRoutes = require('./lib/routes/topicsRoutes'),
	Cache = require('./lib/core/cache');
	
	
// connect to the repository
topicsRepo.connect(function() {
	topicsRepo.all(function(topics) {
		// start caching (updated every 10mins in this case)
		var cache = new Cache(topics, redis);
		cache.cacheFeeds(10);
	});
});

var routes = new TopicsRoutes(topicsRepo, redis);
// routes
app.get('/', routes.index);
app.get('/:name', routes.topic);
app.get('/:name/rss', routes.feed);
app.get('/:name/details', routes.details);

// start app
var port = process.env.PORT || 5000;
app.listen(port);
console.log('Listening on port ' + port);
