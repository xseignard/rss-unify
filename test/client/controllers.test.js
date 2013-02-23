define(['controllers', 'app', 'angularMocks', 'angularSanitize'], function(controllers) {

	var topic = {
		name: "test",
		description: "test feed",
		feeds: [
			"http://rss.feed.com"
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
				$httpBackend = _$httpBackend_;
				$httpBackend.expectGET('api/1/').respond([topic]);
				scope = $rootScope.$new();
				ctrl = $controller(controllers.feedListCtrl, {$scope: scope});
				
			}));
		
			it('should create "feeds" array in the scope with 1 feed in it', function() {
				expect(scope.feeds).toBeUndefined();
				$httpBackend.flush();
				expect(scope.feeds.length).toEqual(1);
				expect(scope.feeds[0]).toEqual(topic);
			});
		
		});
	
	});
});