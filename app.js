// requires
var express = require('express'),
	topics = require('./modules/routes/topics'),
	logger = require('./modules/logger/logger');

// module vars
var app = express();
	log = logger.getLogger();

// routes
app.get('/', function(request, response) {
	  response.send('Zboub');
});

app.get('/topics', topics.findAll);
app.get('/topics/:name', topics.findByName);
app.get('/feed/:name/:size', topics.getFeed);

// start app
var port = process.env.PORT || 5000;
app.listen(port);
log.info('Listening on port ' + port);