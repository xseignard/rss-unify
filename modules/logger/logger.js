// module exports
exports.getLogger = getLogger;

var winston = require('winston');

/**
 * Get the logger
 */
function getLogger() {
	return new (winston.Logger)({
		transports: [
	         new (winston.transports.Console)(),          
	         new winston.transports.File({filename: 'logs/all.log'})
	    ],
		exceptionHandlers: [
	        new winston.transports.File({filename: 'logs/exceptions.log'})
	    ]
	});
}