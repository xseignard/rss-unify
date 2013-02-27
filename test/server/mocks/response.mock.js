// simple response mock
var Response = function() {
    var _data, _statusCode;
    
    var _send = function(responseData) {
		_data = responseData;
    };
    
    var _getData = function() {
		return _data;
    };
    
    var _status = function(code) {
		_statusCode = code;
		var _send = function(message) {};
		
		return {
			send : _send
		};
    };
    
    var _getStatus = function() {
		return _statusCode || 200;
    };
    
    return {
		getData   : _getData,
		send      : _send,
		status    : _status,
		getStatus : _getStatus
    };
};

module.exports = Response;