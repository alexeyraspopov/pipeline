var stub = {};

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

function pendingUnit(value){
	var pending = [];

	function resolve(data){
		if (data === stub) return;
		if (isPromise(data)) return data.then(resolve);
		if (isUnit(data)) return data.bind(resolve);

		pending.forEach(function(pair){
			pair.u.resolve(pair.m(data));
		});
	}

	return { bind: function(morphism){
		var u = pendingUnit(stub);

		pending.push({ u: u, m: morphism });
		resolve(value);

		return u;
	}, resolve: resolve };
}

function unit(value){
	return (isPromise(value) || isUnit(value) ? pendingUnit : resolvedUnit)(value);
}

module.exports = unit;