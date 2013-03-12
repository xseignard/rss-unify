define(['controllers', 'app', 'angularMocks', 'angularSanitize'], function(controllers) {

	var topics = [{
		name: "test",
		description: "test feed",
		feeds: [
			"http://rss.feed.com"
		]
	}];
	
	var feed = {
		title: "test feed",
		description: "test feed",
		feed_url: "url",
		site_url: "url",
		author: "author",
		items: [
			{
				title: "test",
				description: "some article",
				url: "article url",
				categories: [],
				author: "author",
				date: "2013-02-19T23:12:01.000Z"
			}
		]
	};
	
	describe('controllers', function() {

		beforeEach(
			module('rss-unify')
		);


		// testing the feedListCtrl
		describe('feedListCtrl', function() {
			var scope, ctrl, $httpBackend;
			
			// mock the http request the controller handles
			beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
				// faking the services
				scope = $rootScope.$new();
				// faking the request
				$httpBackend = _$httpBackend_;
				$httpBackend.whenGET('api/1/').respond(topics); 
				// create the controller
				ctrl = $controller(controllers.feedListCtrl, {$scope: scope});
			}));
		
			it('should create "feeds" array in the scope with 1 feed in it', function() {
				expect(scope.feeds).toBeUndefined();
				$httpBackend.flush();
				expect(scope.feeds.length).toEqual(1);
				expect(scope.feeds[0]).toEqual(topics[0]);
			});
		
		});
		
		// testing the feedCtrl
		describe('feedCtrl', function() {
			var scope, ctrl, routeParams, $httpBackend;
			
			// mock the http request the controller handles
			beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
				// faking the services
				scope = $rootScope.$new();
				routeParams = {topic: 'test'};
				// faking the request
				$httpBackend = _$httpBackend_;
				$httpBackend.expectGET('api/1/' + routeParams.topic).respond(feed);
				// create the controller
				ctrl = $controller(controllers.feedCtrl, {$scope: scope, $routeParams: routeParams});
			}));
		
			it('should create "feed" object in the scope with the right feed stuff', function() {
				expect(scope.feed).toBeUndefined();
				$httpBackend.flush();
				expect(scope.feed).toEqual(feed);
			});
		
		});
		
		// testing the feedDetailsCtrl
		describe('feedDetailsCtrl', function() {
			var scope, ctrl, routeParams, $httpBackend;
			
			// mock the http request the controller handles
			beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
				// faking the services
				scope = $rootScope.$new();
				routeParams = {topic: 'test'};
				// faking the request
				$httpBackend = _$httpBackend_;
				$httpBackend.expectGET('api/1/' + routeParams.topic + '/details').respond(topics[0]);
				// create the controller
				ctrl = $controller(controllers.feedDetailsCtrl, {$scope: scope, $routeParams: routeParams});
			}));
		
			it('should create "details" object in the scope with the right topic stuff', function() {
				expect(scope.details).toBeUndefined();
				$httpBackend.flush();
				expect(scope.details).toEqual(topics[0]);
			});
		
		});
	
	});
});