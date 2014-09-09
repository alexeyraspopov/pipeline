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

unit(13).bind(process).bind(log);