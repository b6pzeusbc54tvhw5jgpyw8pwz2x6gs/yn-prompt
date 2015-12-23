# yn-prompt

NodeJS module.

This module is very useful when you want to quest request yes or no as answer in your script like a gulpfile.

Its dependency is the prompt module.

##installation
```
npm i yn-prompt
```

##api
```
ynPrompt( msg );
ynPrompt( msg, pattern );
```

##usecase1
```javascript
var ynPrompt = require('yn-prompt');
ynPrompt("Do you want to copy node_modules into the release directory?(y/n)").then( function( yn ) {

  if( yn.toUpperCase() !== 'Y' ) return;

  return ynPrompt("Do you want devDependency?(y/n)");

}).then( function( yn ) {

  if( yn.toUpperCase() !== 'Y' ) {
    // todo: copy both devDependencies and dependencies
  } else {
    // todo: copy only dependencies
  }
});
```


##usecase2 with gulp
```javascript
var gulp = require('gulp');
var ynPrompt = require('yn-prompt');

var goContinue = false;
gulp.task('question', function( done ) {

	var result = syncExec('svn status');
	console.warn( result.stdout );

	ynPrompt('Check the uncommited files. continue? (y/n)').then(( yn ) => {

		if( yn.toUpperCase() === 'Y' ) {
			goContinue = true;
		}
		done();
	});
});
gulp.task('preversion',['question'], function( done ) {
	if( ! goContinue ) {
		logger.info('canceled version up process');
		throw { errorDesc: 'canceled version up process' };
	}

	done();
});
```

# License: MIT
