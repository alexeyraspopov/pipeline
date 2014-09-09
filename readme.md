# Pipeline

## Units

 - Promise
 - Observable
 - Thunk
 - Generator
 - Pure Value
 - Maybe, Either

## Why?

 1. It's difficult to go from sync to async function without changing way of invokation of this function
 2. Calculation flow should be explicit
 3. Do we really need universal wrapper? jQ, promises, chains, array flow resolve their own tasks

## How can it be combined?

```javascript
function getNewPosts(id){
  return unit(loadUser(id)).bind(getUserPosts).bind(filterNewPosts);
}

getNewPosts(id).bind(template).bind(updateUI);
```

## API

    unit(value);

 * `value` - everything you want

Returns wrapped value which can be binded to the flow. Value can be simple object, primitive value or previously wrapped value (Promise, Thunk, etc)

Unit has one method

    unit(value).bind(morphism);

 * `morphism` - function which receives value of unit and returns new value or new unit

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
