// require
var MongoClient = require('mongodb').MongoClient;

// mongodb uri
var uri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/topicsDB';

var topics = [
		{
			name : 'mde',
			description : 'model driven engineering',
			feeds : [
					'http://tronprog.blogspot.com/feeds/posts/default?alt=rss',
					'http://www.insighteck.com/blog/?feed=rss2',
					'http://christiandietrich.wordpress.com/feed/',
					'http://thebootstrap.blogspot.com/feeds/posts/default?alt=rss',
					'http://zarnekow.blogspot.com/feeds/posts/default?alt=rss',
					'http://feeds2.feedburner.com/MetaBeta',
					'http://nirmalsasidharan.wordpress.com/feed/',
					'http://dslmeinte.wordpress.com/feed/',
					'http://feeds.feedburner.com/eclipsedriven',
					'http://lsd.luminis.eu/category/technical/mdd-technical/feed/',
					'http://vhanniet.wordpress.com/feed/',
					'http://feeds.feedburner.com/mobl',
					'http://stephanebegaudeau.tumblr.com/rss',
					'http://eef-modeling.blogspot.com/feeds/posts/default?alt=rss',
					'http://modeldrivensoftware.ning.com/forum/topic/list?feed=yes&xn_auth=no&sort=mostRecent',
					'http://modeldrivensoftware.ning.com/profiles/blog/feed?xn_auth=no',
					'http://feeds.feedburner.com/TheEnterpriseArchitect',
					'http://modeling-languages.com/blogs/jordi/feed',
					'http://www.hulshout.nl/?feed=rss2',
					'http://5ise.quanxinquanyi.de/feed/',
					'http://www.metacase.com/blogs/jpt/jpt-rss.xml',
					'http://www.metacase.com/blogs/stevek/stevek-rss.xml',
					'http://blog.efftinge.de/feeds/posts/default',
					'http://actifsource.blogspot.com/feeds/posts/default?alt=rss',
					'http://feeds.feedburner.com/FormFollowsFunction',
					'http://activeknowledgemodeling.com/feed/',
					'http://thegordian.blogspot.com/feeds/posts/default?alt=rss',
					'http://skanderturki.wordpress.com/feed/',
					'http://ekkescorner.wordpress.com/feed/',
					'http://kthoms.wordpress.com/feed/',
					'http://kenn-hussey.blogspot.com/feeds/posts/default?alt=rss',
					'http://abstratt.com/blog/feed/',
					'http://ed-merks.blogspot.com/feeds/posts/default?alt=rss',
					'http://pjmolina.com/metalevel/feed/',
					'http://www.itemis.com/feed/rss.xml',
					'http://modelseverywhere.wordpress.com/feed/',
					'http://fmadiot.blogspot.com/feeds/posts/default?alt=rss',
					'http://model-driven-blogging.blogspot.com/feeds/posts/default?alt=rss',
					'http://voelterblog.blogspot.com/atom.xml',
					'http://blanglois.blogspot.com/feeds/posts/default?alt=rss',
					'http://www.ebpml.org/blog2/index.php?tempskin=_rss2',
					'http://eclipsemde.blogspot.com/feeds/posts/default?alt=rss',
					'http://freddyallilaire.blogspot.com/feeds/posts/default?alt=rss',
					'http://mdwhatever.free.fr/index.php/feed/',
					'http://blogs.euranova.eu/?feed=rss2',
					'http://jomd.blogspot.com/feeds/posts/default?alt=rss',
					'http://alagarde.tumblr.com/rss',
					'http://metaplop.blogspot.com/feeds/posts/default?alt=rss',
					'http://blog.benois.fr/feed/atom',
					'http://feeds.feedburner.com/aspectize',
					'http://blogs.msdn.com/jmprieur/rss.xml' ]
		}, {
			name : 'eclipse',
			description : 'eclipse platform feeds',
			feeds : [ 'http://www.planeteclipse.org/planet/rss20.xml' ]
		}, {
			name : 'js',
			description : 'html5/js feeds',
			feeds : [ 'http://howtonode.org/feed.xml',
			          'http://feeds.feedburner.com/html5rocks',
			          'http://rss.badassjs.com']
		} ];

MongoClient.connect(uri, function(err, db) {
	db.collection('topics', function(err, collection) {		
		// remove the collection (if existing)
		collection.remove({},function(err, removed){});
		// create it
		collection.insert(topics, {safe : true}, 
			function(err, result) {
				if (err) {
					console.log('Something went wrong');
					process.exit(1);
				}
				console.log('Done');
				process.exit(0);
			});
	});
});