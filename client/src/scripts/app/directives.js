// Directives module
define(['utils/urlUtils'], function(urlUtils) {

	// object holding the directives
	var directives = {};

	/**
	 * Directive to check wether all lines are url
	 */
	directives.validateUrlList = function() {
		return {
			// restrict to an attribute type.
			restrict: 'A',
			// element must have ng-model attribute.
			require: 'ngModel',
			// scope = the parent scope
			// elem = the element the directive is on
			// attr = a dictionary of attributes on the element
			// ctrl = the controller for ngModel.
			link: function(scope, elem, attr, ctrl) {
				//test and set the INITIAL validity for validateUrlList.
				ctrl.$setValidity('validateUrlList', urlUtils.urlsAreValid(ctrl.$viewValue));
				// add a parser that will process each time the value is 
				// parsed into the model when the user updates it.
				ctrl.$parsers.unshift(function(value) {    
					//test ans set the validity after update.
					ctrl.$setValidity('validateUrlList', urlUtils.urlsAreValid(value));
					// return the value, this is important or you will not see the model 
					// updating, because the parser is returning nothing.
					return value;
				});
			}
		};
	};
	
	/**
	 * Directive to check wether a value is already taken
	 */
	directives.alreadyTaken = function() {
		return {
			// restrict to an attribute type.
			restrict: 'A',
			// element must have ng-model attribute.
			require: 'ngModel',
			// scope = the parent scope
			// elem = the element the directive is on
			// attr = a dictionary of attributes on the element
			// ctrl = the controller for ngModel.
			link: function(scope, elem, attr, ctrl) {
				//test and set the INITIAL validity for validateUrlList.
				ctrl.$setValidity('validateUrlList', urlUtils.urlsAreValid(ctrl.$viewValue));
				// add a parser that will process each time the value is 
				// parsed into the model when the user updates it.
				ctrl.$parsers.unshift(function(value) {    
					//test ans set the validity after update.
					ctrl.$setValidity('validateUrlList', urlUtils.urlsAreValid(value));
					// return the value, this is important or you will not see the model 
					// updating, because the parser is returning nothing.
					return value;
				});
			}
		};
	};
	
	return directives;
});