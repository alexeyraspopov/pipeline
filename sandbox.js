function isMonad(target){
	return target instanceof Unit;
}

function Unit(value){
	this.bind = function(fn){
		var result = fn(value);
		return isMonad(result) ? result : new Unit(result);
	};
	this.peek = function(){
		return value;
	};
}

function unit(value){
	return new Unit(value);
}

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