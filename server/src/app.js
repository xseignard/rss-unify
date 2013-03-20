'use strict';
// requires
var express = require('express'),
	app = express(),
	conf = require('./conf/conf'),
	// mongo
	topicsRepo = require('./core/repository')(conf.MONGO_URL, 'topics'),
	// redis
	redis = require('redis-url').connect(conf.REDIS_URL),
	// modules
	TopicsRoutes = require('./routes/topicsRoutes'),
	cacheService = require('./core/cacheService')(redis);


// connect to the repository
var updateCache = function() {
	topicsRepo.connect(function() {
		topicsRepo.all(function(topics) {
			// executed when all caching is done
			var done = function() {
				topicsRepo.close();
			};
			// start caching 
			cacheService.cacheFeeds(topics, done);
		});
	});
};
updateCache();
var tenMinutes = 10 * 1000 * 60;
setInterval(updateCache, tenMinutes);

var routes = new TopicsRoutes(topicsRepo, cacheService);

// app conf
// development only
app.configure('development', function(){
	app.use(express.static(__dirname + '/../../client/src'));
	app.use('/components', express.static(__dirname + '/../../client/components'));
});

// production only
app.configure('production', function(){
  app.use(express.static(__dirname + '/../../client/dist'));
});


app.use(express.bodyParser());

app.get('/', function (req, res) {
	res.sendfile('index.html');
});

// routes
app.get(conf.API_PREFIX + '/', routes.index);
app.get(conf.API_PREFIX + '/:name', routes.topic);
app.get('/:name/rss', routes.redirectToFeed);
app.get(conf.API_PREFIX + '/:name/rss', routes.feed);
app.get(conf.API_PREFIX + '/:name/details', routes.details);
app.post(conf.API_PREFIX + '/new', routes.newTopic);

// start app
var port = process.env.PORT || 5000;
app.listen(port);
console.log('Listening on port ' + port);
