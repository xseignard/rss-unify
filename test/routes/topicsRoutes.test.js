var libpath = process.env.TEST_COV ? 'lib-cov' : 'lib',
    assert = require('assert'),
	TopicsRoutes = require('../../'+ libpath +'/routes/topicsRoutes'),
	// simple repo mock
	repo = require('../mocks/repo.mock'),
	// simple store mock
	store = require('../mocks/store.mock'),
	// simple response mock
	Response = require('../mocks/response.mock'),
	// tested module
	routes = new TopicsRoutes(repo, store);

describe('TopicsRoutes', function() {
  
	describe('#index()', function() {
		it('should return 2 topics', function() {
			var response = new Response();
			routes.index({}, response);
			assert.equal(response.getData().length, 2);
		});
	});
	
	describe('#topic()', function() {
		it('should return 1 topic', function() {
			var response = new Response();
			var req = {
				params : {
					name : 'test'
				}
			};
			routes.topic(req, response);
			assert.notEqual(response.getData(), undefined);
		});
		
		it('should return a 404', function() {
			var response = new Response();
			var req = {
				params : {}
			};
			routes.topic(req, response);
			assert.equal(response.getStatus(), 404);
		});
	});

});