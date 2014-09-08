var unit = require('./unit');

function square(a){
	return a * a;
}

function str(a){
	return String(a);
}

console.log(unit(13).bind(square).peek() === square(13));

console.log(unit(13).bind(unit).peek() === unit(13).peek());

console.log(unit(13).bind(square).bind(str).peek() === unit(13).bind(function(value){
	return unit(square(value)).bind(str);
}).peek());