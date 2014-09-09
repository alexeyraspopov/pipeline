var unit = require('./unit');

function process(value){
	return function(done){
		setTimeout(function(){
			done(value * 2);
		}, 1000);
	};
}

function log(){
	console.log(arguments);
}

function inc(value){
	return value + 1;
}

unit(13).bind(process).bind(inc).bind(log);