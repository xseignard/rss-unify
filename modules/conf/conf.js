var Conf = {
	// the url of the app
	URL : process.env.URL || 'http://localhost:8080/',
	// redis url
	REDIS_URL : process.env.REDISTOGO_URL || 'redis://localhost:6379',
	// mongodb url
	MONGO_URL : process.env.MONGOLAB_URI || 'mongodb://localhost:27017/topicsDB',
	// mongo prod
	MONGO_PROD : 'mongodb://heroku_app8847953:qqgodpict4fbuj234verfa4s5i@ds041347.mongolab.com:41347/heroku_app8847953'
};

module.exports = Conf;