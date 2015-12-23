var when = require('when');
var prompt = require('prompt');

module.exports = function( description, pattern ) {

	var deferred = when.defer();
	pattern = pattern || /^[ynYN]$/;

	prompt.message = "";
	prompt.delimiter = "";
	prompt.start();
	prompt.get([{
		name: 'answer',
		description: description.yellow,
		type: 'string',
		pattern: pattern,
		message: 'you must input as ' + pattern,
		required: true
		
	}], function( err, promptResult ) {

		if( err ) {
			console.error( err );
			deferred.reject( err );
			throw err;
		}

		deferred.resolve( promptResult.answer );
	});

	return deferred.promise;
};
