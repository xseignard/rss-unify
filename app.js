// requires
var express = require('express'),
	app = express(),
	conf = require('./src/server/conf/conf'),
	// mongo
	topicsRepo = require('./src/server/core/repository')(conf.MONGO_URL, 'topics'),
	// redis
	redis = require('redis-url').connect(conf.REDIS_URL),
	// modules
	TopicsRoutes = require('./src/server/routes/topicsRoutes'),
	Cache = require('./src/server/core/cache');
	
	
// connect to the repository
topicsRepo.connect(function() {
	topicsRepo.all(function(topics) {
		// start caching (updated every 10mins in this case)
		var cache = new Cache(topics, redis);
		cache.cacheFeeds(10);
	});
});

var routes = new TopicsRoutes(topicsRepo, redis);

// app conf
app.use(express.static(__dirname + '/src/client'));
app.use(express.bodyParser());

app.get('/', function (req, res) {
	res.sendfile('index.html');
});

// routes
app.get(conf.API_PREFIX + '/', routes.index);
app.get(conf.API_PREFIX + '/:name', routes.topic);
app.get(conf.API_PREFIX + '/:name/rss', routes.feed);
app.get(conf.API_PREFIX + '/:name/details', routes.details);
app.post(conf.API_PREFIX + '/new', routes.newTopic);

// start app
var port = process.env.PORT || 5000;
app.listen(port);
console.log('Listening on port ' + port);
