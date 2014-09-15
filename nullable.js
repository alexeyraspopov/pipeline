var m = require('./unit');

function nullSafe(target, keypath){
	var accessor = new Function('target', 'return target.' + keypath);

	try{
		return m.maybe(accessor(target));
	} catch(e) {
		return m.maybe(null);
	}
}

nullSafe({ name: 'aa' }, 'name').bind(function(){
	console.log(arguments);
});
