var log = function(){ console.log(arguments); },
	unit = require('./index2'),
	Promise = require('q').Promise;

function asyncResolve(value, timeout){
	return new Promise(function(resolve){
		return setTimeout(resolve, timeout, value);
	});
}

unit(asyncResolve(13, 1000))
	.bind(log)
	.bind(function(){
		return unit('inline');
	})
	.bind(function(a){
		return a + ' boo';
	})
	.bind(log)
	.bind(function(){ return asyncResolve('fuck', 2000); })
	.bind(log);
