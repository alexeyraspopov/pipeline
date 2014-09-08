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

module.exports = function unit(value){
	return new Unit(value);
}