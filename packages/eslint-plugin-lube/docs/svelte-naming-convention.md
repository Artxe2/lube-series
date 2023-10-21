# svelte-naming-convention
Enforces snake_case with some symbols for variable declaration.  
[svelte#code-conventions](https://github.com/sveltejs/svelte/blob/master/CONTRIBUTING.md#code-conventions)

## options
```js
schema: [{
    properties: {
        fixSameNames: {
            type: "boolean",
            default: true
        },
    },
    type: "object"
}]
```
### fixSameNames
If set to `true`, an error will be returned if the variable name is the same, even in the case of function calls that are the target of `defer`.
```js
myFunction() // Only in the case that fixSameNames is true, an error occurs.

// Identifier 'myFunction' does not match for svelte's naming conventions.
function myFunction() {

}
```

## Valid
```js
var snake_case = 'Hello'
var snake1_2_3case_4 = 'Hello'
var SNAKE_CASE = 'Hello'
var SNAKE1_2_3CASE_4 = 'Hello'
var PascalCase = 'Hello'
var P1ascal2Case345 = 'Hello'
var __ = 'Hello'
var $$ = 'Hello'
var __snake_case$$ = 'Hello'
var $$snake_case$$ = 'Hello'
```

## Invalid
```js
var camelCase = 'Hello'
var NO_SNAKE__CASE = 'Hello'
var NO_SNAKE_CASE_ = 'Hello'
var __camelCase$$ = 'Hello'
```