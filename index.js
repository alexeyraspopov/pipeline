// TODO: add `reject`
function apply(value, resolve){
	return resolve(value);
}

function isMonad(value){
	return value && value.isMonad;
}

function isPromise(value){
	return value && typeof value.then === 'function';
}

// return { bind: function(){ return value.then ... }}
function bindPromise(value, resolve){
	return value.then(function(value){
		return bind(value, resolve);
	});
}

function bindMonad(value, resolve){
	return value.bind(resolve);
}

// FIXME: need more scalable solution for type-checking
function binder(value){
	return isPromise(value) ? bindPromise : isMonad(value) ? bindMonad : apply;
}

function bind(value, resolve){
	return unit(binder(value)(value, resolve));
}

function unit(value){
	return isMonad(value) ? value : { isMonad: true, bind: function(resolve){
		return bind(value, resolve);
	} };
}

module.exports = unit;