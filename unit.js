// TODO: update bind method for Promises

function isNullable(value){
	return value == null;
}

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

function Nothing(){
	this.bind = function(){
		return this;
	}.bind(this);
}

exports.unit = function unit(value){
	return new Unit(value);
};

exports.maybe = function maybe(value){
	return isNullable(value) ? new Nothing() : new Unit(value);
};

/*function unit(value){
	return { bind: function(morphism){
		return unit(morphism(value));
	} };
}

function unit(predicate, value){
	return value && value.isMonad ? value : {
		isMonad: true,
		bind: function(success, failure){
			var morphism = (predicate(value) ? success : failure) || function(){};

			return unit(predicate, morphism(value));
		}
	};
}
*/
