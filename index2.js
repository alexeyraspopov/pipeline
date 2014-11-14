function isPromise(value){
	return value && value.then;
}

function isUnit(value){
	return value && value.bind;
}

function resolvedUnit(value){
	return { bind: function(morphism){
		return unit(morphism(value));
	} };
}

function continuate(data, resolve){
	if (isPromise(data)) return data.then(resolve);
	if (isUnit(data)) return data.bind(resolve);
}

function resolveChain(pending, data){
	pending.forEach(function(pair){
		pair.unit.resolve(pair.morphism(data));
	});
}

function pendingUnit(value){
	var pending = [];

	function resolve(data){
		return continuate(data, resolve) || resolveChain(pending, data);
	}

	return { bind: function(morphism){
		var u = pendingUnit();

		pending.push({ unit: u, morphism: morphism });
		continuate(value, resolve);

		return u;
	}, resolve: resolve };
}

function unit(value){
	if (isUnit(value)) return value;

	return (isPromise(value) ? pendingUnit : resolvedUnit)(value);
}

module.exports = unit;