# Wizard Lube
## Simplify Wizard Flow Management in JavaScript
Managing complex wizard flows in JavaScript can be a daunting task, especially when it involves handling multiple steps and data manipulation. However, with the **"wizard-lube"** library, handling wizard flows becomes a seamless experience.
This powerful JavaScript library provides a flexible and intuitive API that simplifies the management of wizard flows and empowers developers to efficiently handle step transitions and data accumulation.
<br>
<br>

## installation
index.min.js: 253 byte
```
npm i -D wizard-lube
```

<br>

## types
```ts
type Flow = {
	add: (pathname: string, handler: HandlerFunction) => Flow
	begin: () => {
		data: () => Record<string, any>
		step: (data: Record<string, any>) => void
	}
}
declare module "wizard-lube" {
	const flow: (base?: string) => Flow
}
```
<br>

## Flow Configuration
```js
import { flow } from "wizard-lube"

let myWizard = flow("/context-path") // Set uri prefix
	.add("/step1", ({ flag }) => {
		if (flag === 2) location.pathname = "/context-path/step2"
		else if (flag === 3) location.pathname = "/context-path/step3"
	}) // Step branching according to condition
	.add("/step2", () => location.pathname = "/context-path/step4")
	.add("/step3", () => location.pathname = "/context-path/step4")
	.add("/step4", data => {
		fetch("/context-path/submit", {
			method: "POST",
			body: JSON.stringify(data) // Submit accumulated data
		}).then(async value => {
				if (value.status > 299) throw { status: value.status, message: (await value.json()).message }
				return value.json()
			}, reason => console.error(reason.message))
			.then(() => {
				window.myWizardForm = void 0 // Free memory
				location.href = "/context-path/success" // Go to success page
			})
	})

// Start the wizard flow
window.myWizardForm = wizard.begin()
```
<br>

## Step by step
```html
<!-- On the screen, everything is handled with just step -->
<button onclick="myWizardForm.step(getForm())">Submit</button>
```
- - -