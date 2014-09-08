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
 3. ...

## How can it be combined?

```javascript
function getNewPosts(id){
  return unit(loadUser(id)).bind(getUserPosts).bind(filterNewPosts);
}

getNewPosts(id).bind(template).bind(updateUI);
```
