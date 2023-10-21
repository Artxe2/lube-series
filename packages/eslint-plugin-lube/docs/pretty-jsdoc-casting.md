# pretty-imports
Enforces proper indentation for import and export statements.

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