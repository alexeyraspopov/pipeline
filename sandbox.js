var unit = require('./unit').unit;

function square(a){
	return a * a;
}

function str(a){
	return String(a);
}

function assertAxiom(left, right){
	function chain(val, fn){
		return val.bind ? val.bind(fn) : fn(val);
	}

	chain(left, function(valueA){
		chain(right, function(valueB){
			console.log(valueA === valueB);
		});
	});
}

assertAxiom(unit(13).bind(square), square(13));

assertAxiom(unit(13).bind(unit), unit(13));

assertAxiom(unit(13).bind(square).bind(str), unit(13).bind(function(value){
	return unit(square(value)).bind(str);
}));