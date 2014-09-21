# Pipeline

## Units

 - Promise
 - Observable
 - Thunk
 - Generator
 - Stream 
 - Pure Value
 - Maybe, Either

## Why?

 1. It's difficult to go from sync to async function without changing way of invokation of this function (non-local changes without problems)
 2. Calculation flow should be explicit

## Questions

 1. Do we really need universal wrapper? jQ, promises, chains, array flow resolve their own tasks
 2. How can I describe "unwrapping" process?

## API

    unit(value);

 * `value` - everything you want

Returns wrapped value which can be binded to the flow. Value can be simple object, primitive value or previously wrapped value (Promise, Thunk, etc)

Unit has one method, which returns new unit.

    unit(value).bind(morphism);

 * `morphism` - function which receives value of unit and returns new value or new unit. In first case value will be wrapped in unit

## Examples

```javascript
function getUserInfo(id){
	return new Promise();
}

function getPosts(user){
	return Maybe(user.posts);
}

function template(data){
	return _.template('', data);
}

function appendToView(html){
	document.body.innerHTML = html;
}

unit(getUserInfo(id)).bind(getPosts).bind(template).bind(appendToView);
```
