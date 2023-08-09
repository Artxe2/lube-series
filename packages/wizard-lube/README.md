# Wizard Lube
## Simplify Wizard Flow Management in JavaScript
Managing complex wizard flows in JavaScript can be a daunting task, especially when it involves handling multiple steps and data manipulation.  
However, with the **"wizard-lube"** library, handling wizard flows becomes a seamless experience.  
This powerful JavaScript library provides a flexible and intuitive API that simplifies the management of wizard flows and empowers developers to efficiently handle step transitions and data accumulation.
<br>
<br>

## installation
```
npm i -D wizard-lube
```

<br>

## types
```ts
/**
 * Represents the object returned by the `flow` function.
 *
 * Provides methods to add form handlers and begin form processing.
 */
type Flow = {
	/**
	 * Adds a form handler for the specified `pathname`.
	 * @param pathname The relative URL path for the handler.
	 * @param handler The function that handles the form data for the specified `location.pathname`.
	 * @returns The `Flow` object for method chaining.
	 */
	add(pathname: string, handler: (data: Record<string, any>) => void): Flow

	/**
	 * Begins the form processing and returns an object with methods to manage the form data.
	 * @returns An object containing methods to interact with the form data and step through the wizard.
	 */
	begin(): {
		/**
		 * Retrieves the current form data.
		 * @returns The current form data as an object with string keys and any values.
		 */
		data(): Record<string, any>

		/**
		 * A function that update data from the previous step for `popState`.
		 * @throws Error("No information from previous data.") -- Failed to get previous data to current `location.pathname`
		 */
		footprint(): Promise<void>

		/**
		 * Forward the form data updated with the `data` you received to the data handler corresponding to the current `location.pathname`.
		 * @param data The form data to be updated for the current step.
		 */
		step(data: Record<string, any>): void
	}
}

declare module "wizard-lube" {
	/**
	 * Creates and initializes a form wizard with optional base URL.
	 * @param base The base URL for the form wizard.
	 *
	 * (Default: "/")
	 * @returns A Flow instance to manage the form flow and handlers.
	 */
	const flow: (base?: string) => Flow
}
```