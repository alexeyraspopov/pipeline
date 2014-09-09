// TODO: update bind method for Promises

function isMonad(target){
	return target instanceof Unit;
}

function wrap(result){
	return isMonad(result) ? result : new Unit(result);
}

function fromValue(value, fn){
	return wrap(fn(value));
}

function Unit(value){
	this.bind = fromValue.bind(null, value);
}

module.exports = function unit(value){
	return new Unit(value);
};