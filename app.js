// requires
var express = require('express'),
	topics = require('./modules/routes/topics'),
	cache = require('./modules/core/cache');

// module vars
var app = express();
	
// start caching (updated every 10mins in this case)
cache.cacheFeeds(10);

// routes
app.get('/', topics.findAll);
app.get('/:name', topics.findByName);
app.get('/:name/rss', topics.getFeed);

// start app
var port = process.env.PORT || 5000;
app.listen(port);
console.log('Listening on port ' + port);