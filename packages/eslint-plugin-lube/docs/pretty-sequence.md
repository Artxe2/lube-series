# pretty-imports
Enforces arrays, objects, and functions to have a pretty format by enforcing proper indentation in sequences.

## options
```js
schema: [
    {
        properties: {
            arrayBracketSpacing: { type: "boolean", default: true },
            checkCall: { type: "boolean", default: true },
            checkArray: { type: "boolean", default: true },
            checkObject: { type: "boolean", default: true },
            checkSequence: { type: "boolean", default: true },
            funcCallSpacing: { type: "boolean", default: false },
            ignoreTemplateLiteral: { type: "boolean", default: true },
            indent: { type: "string", default: "\t" },
            maxLength: { type: "number", default: 30 },
            objectCurlySpacing: { type: "boolean", default: true }
        },
        type: "object"
    }
]
```
### arrayBracketSpacing
If it is `true`, it inserts spaces inside array brackets.
### checkArray
If it is `true`, it checks the array statement.
### checkCall
If it is `true`, it checks the function statement.
### checkObject
If it is `true`, it checks the object statement.
### checkSequence
If it is `true`, it checks the sequence statement.
### funcCallSpacing
If it is `true`, it inserts spaces inside function parenthesis.
### ignoreTemplateLiteral
If it is `true`, it ignores the template literal syntax.
### indent
This is the character to be used for indentation.
### maxLength
If the sum of the characters in the Sequences is greater than the set value, apply line breaks.
```js
// If maxLength is less than or equal to 20, an error occurs.
var value = { fff, ggg, hhh, iii, jjj, kkk, lll }
```
### objectCurlySpacing
If it is `true`, it inserts spaces inside object braces.

## Valid
```js
var value = [ a, b, c ]
var value = [
    aaaaaaaaaa,
    bbbbbbbbbb,
    cccccccccc,
    dddddddddd
]
var value = { a, b, c, d, e }
var value = {
    aaaaaaaaaa,
    bbbbbbbbbb,
    cccccccccc,
    dddddddddd
}
function func(a, b, c) {

}
function func(
    aaaaaaaaaa,
    bbbbbbbbbb,
    cccccccccc,
    dddddddddd
) {

}
var value = `${[a,b,c]}`

func(
    aaaaaaaaaa_bbbbbbbbbb_cccccccccc
)
    .a(
        aaaaaaaaaa_bbbbbbbbbb_cccccccccc
    )
    .b(
        aaaaaaaaaa_bbbbbbbbbb_cccccccccc
    )
    .c(
        aaaaaaaaaa_bbbbbbbbbb_cccccccccc
    )

var value = {
    a: [ a, b, c ],
    b: true,
    c: {
        aaaaaaaaaa: a,
        bbbbbbbbbb: b,
        c: [
            aaaaaaaaaa,
            bbbbbbbbbbb,
            ccccccccccc
        ],
        d: {
            aaaaaaaaaa,
            bbbbbbbbbbb,
            ccccccccccc
        }
    }
}
```

## Invalid
```js
var value = [a,b,c]
var value = { aaaaaaaaaa, bbbbbbbbbb, cccccccccc, dddddddddd }
new Obj(

)
```