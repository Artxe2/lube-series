# pretty-jsdoc-casting
Enforces additional empty comment when type casting in JSDoc.

## options
```js
schema: undefined
```

## Valid
```js
var v = func(
    a
)
var v = /** @type {A} */(/** @type {B} */(/** @type {C} */(a)/**/)/**/)/**/
var v = /** @type {A} */(a)/**/()
var v = { b: /** @type {A} */(a)/**/ }
```

## Invalid
```js
var v = /** @type {A} */(  /** @type {B} */(/** @type {C} */((a))))
var v = { b: /** @type {A} */(a) }
var v = { b: /**@type {A}*/(a)/**/ }
```