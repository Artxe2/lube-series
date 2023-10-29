## DOM Eater
## AST parser for HTML that quotes JS statements using curly braces
This is a tool that uses braces to extract JS blocks and text blocks from JSX or other HTML templates without using a JS parser.
<br>
<br>

## Installation
```bash
npm i dom-eater
```
```bash
pnpm i dom-eater
```
```bash
bun i dom-eater
```

## How to use
### Get simple AST from HTML code
```ts
import { parseHtml } from "dom-eater"

parseHtml(`<!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
    <div attr="text{js-attr}">
	  TEXT{js-text}
	</div>
  </body>
</html>`)
```
```json
{
  "ast": [
    {
      "attributes": [
        {
          "end": 14,
          "name": "html",
          "start": 10,
          "type": "Attribute",
          "value": true
        }
      ],
      "children": [],
      "end": 15,
      "name": "!DOCTYPE",
      "start": 0,
      "subType": "open",
      "type": "Element"
    },
    {
      "end": 16,
      "start": 15,
      "type": "Text"
    },
    {
      "attributes": [],
      "children": [
        {
          "end": 25,
          "start": 22,
          "type": "Text"
        },
        {
          "attributes": [],
          "children": [
            {
              "end": 34,
              "start": 31,
              "type": "Text"
            }
          ],
          "end": 41,
          "name": "head",
          "start": 25,
          "subType": "open",
          "type": "Element"
        },
        {
          "end": 44,
          "start": 41,
          "type": "Text"
        },
        {
          "attributes": [],
          "children": [
            {
              "end": 55,
              "start": 50,
              "type": "Text"
            },
            {
              "attributes": [
                {
                  "end": 80,
                  "name": "attr",
                  "start": 60,
                  "type": "Attribute",
                  "value": {
                    "end": 80,
                    "scripts": [
                      {
                        "end": 79,
                        "start": 70,
                        "strings": [],
                        "subType": "block",
                        "type": "Script"
                      }
                    ],
                    "start": 65,
                    "subType": "double",
                    "type": "String"
                  }
                }
              ],
              "children": [
                {
                  "end": 89,
                  "start": 81,
                  "type": "Text"
                },
                {
                  "end": 98,
                  "start": 89,
                  "strings": [],
                  "subType": "block",
                  "type": "Script"
                },
                {
                  "end": 100,
                  "start": 98,
                  "type": "Text"
                }
              ],
              "end": 106,
              "name": "div",
              "start": 55,
              "subType": "open",
              "type": "Element"
            },
            {
              "end": 109,
              "start": 106,
              "type": "Text"
            }
          ],
          "end": 116,
          "name": "body",
          "start": 44,
          "subType": "open",
          "type": "Element"
        },
        {
          "end": 117,
          "start": 116,
          "type": "Text"
        }
      ],
      "end": 124,
      "name": "html",
      "start": 16,
      "subType": "open",
      "type": "Element"
    }
  ],
  "errors": []
}
```
### Get simple AST from JSX code
```ts
import { parseJsx } from "dom-eater"

const result = parseJsx(`import { param } from "module"
export function App() {
  const [value, setValue] = useValue(param)
  return <div attr="text{js-attr}">
	TEXT{js-text}
  </div>
}`)

```
```json
{
  "ast": [
    {
      "attributes": [
        {
          "end": 133,
          "name": "attr",
          "start": 113,
          "type": "Attribute",
          "value": {
            "end": 133,
            "scripts": [
              {
                "elements": [],
                "end": 132,
                "start": 123,
                "strings": [],
                "subType": "jsx",
                "type": "Script"
              }
            ],
            "start": 118,
            "subType": "double",
            "type": "String"
          }
        }
      ],
      "children": [
        {
          "end": 140,
          "start": 134,
          "type": "Text"
        },
        {
          "elements": [],
          "end": 149,
          "start": 140,
          "strings": [],
          "subType": "jsx",
          "type": "Script"
        },
        {
          "end": 152,
          "start": 149,
          "type": "Text"
        }
      ],
      "end": 158,
      "name": "div",
      "start": 108,
      "subType": "open",
      "type": "Element"
    }
  ],
  "errors": []
}
```