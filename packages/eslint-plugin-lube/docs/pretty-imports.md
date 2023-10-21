# pretty-imports
Enforces proper indentation for import and export statements.

## options
```js
schema: [{
    properties: {
        checkExports: {
            type: "boolean",
            default: true
        },
        checkImports: {
            type: "boolean",
            default: true
        },
        indent: {
            type: "string",
            default: "\t"
        },
        maxLength: {
            type: "number",
            default: 30
        },
        semicolon: {
            type: "boolean",
            default: false
        }
    },
    type: "object"
}]
```
### checkExports
If it is `true`, it checks the export statement.
### checkImports
If it is `true`, it checks the import statement.
### indent
This is the character to be used for indentation.
### maxLength
If the sum of the characters in the Specifier is greater than the set value, apply line breaks.
```js
// If maxLength is less than or equal to 20, an error occurs.
export { fff, ggg, hhh, iii, jjj, kkk, lll } from 'module/2'
```
### semicolon
If it is `true`, insert a semicolon explicitly.

## Valid
```js
export { a, b as c, d } from 'module'
export { fff, ggg, hhh, iii, jjj, kkk, lll } from 'module/2'
import {
    aaaaa_bbbbb,
    aaaaa_ccccc,
	aaaaa_ddddd
} from "module"
```

## Invalid
```js
export { a, b as c, d } from 'module';
export {a, b as c, d} from 'module'
export {
    a,
    b as c,
    d
} from 'module'
import { aaaaa_bbbbb, aaaaa_ccccc, aaaaa_ddddd } from "module"
import {
    aaaaa_bbbbb,
    aaaaa_ccccc,
    aaaaa_ddddd
    } from "module"
```