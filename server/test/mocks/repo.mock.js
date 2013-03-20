'use strict';
// simple repo mock
var RepoMock = function() {
	var items = [
		{
			name: "test",
			description: "test",
			feeds: ["http://a.nice/rss/feed"]
		}, {
			name: "test2",
			description: "test2",
			feeds: ["http://another.nice/rss/feed"]
		}];

	var _connect = function(callback) {
		callback();
	};

	var _all = function(callback) {
		callback(items);
	};

	var _find = function(query, callback) {
		callback(items);
	};

	var _one = function(query, callback) {
		if (query.name) {
			callback(items[0]);
		}
		else {
			callback(undefined);
		}
    };

	var _newOne = function(object, callback) {
		if (object.error) callback(object.error, object);
		callback(undefined, object);
	};

	return {
		connect : _connect,
		all     : _all,
		find    : _find,
		one     : _one,
		newOne  : _newOne
	};
}();

module.exports = RepoMock;