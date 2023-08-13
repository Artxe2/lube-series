/**
 * Creates and initializes a form wizard with optional base URL.
 * @param {string} base The base URL for the form wizard.
 *
 * (Default: "/")
 * @returns A Flow instance to manage the form flow and handlers.
 */
export default (base = "/") => {
	/** @type {Map<string, (data: Record<string, any>) => void>} */
	let handlers = new Map()
	let utils = {
		/**
		 * Adds a form handler for the specified `pathname`.
		 * @param {string} pathname The relative URL path for the handler.
		 * @param {(data: Record<string, any>) => void} handler
		 * The function that handles the form data for the specified `location.pathname`.
		 * @returns The `Flow` object for method chaining.
		 */
		add(pathname, handler) {
			handlers.set(base + pathname, handler)
			return utils
		},
		/**
		 * Begins the form processing and returns an object with methods to manage the form data.
		 * @returns An object containing methods to interact with the form data and step through the wizard.
		 */
		begin: () => {
			/** @type Record< string, Record<string, *> > */
			let prevForms = {}
			/** @type Record<string, *> */
			let form = {}
			return {
				/**
				 * Retrieves the current form data.
				 * @returns The current form data as an object with string keys and any values.
				 */
				data: () => form,
				/**
				 * A function that update data from the previous step for `popState`.
				 * @throws Error("No information from previous data.")
				 * -- Failed to get previous data to current `location.pathname`
				 */
				footprint() {
					form = prevForms[location.pathname]
					if (!form) throw Error("No information from previous data.")
				},
				/**
				 * Forward the form data updated with the `data`
				 * you received to the data handler corresponding to the current `location.pathname`.
				 * @param {Record<string, *>} data The form data to be updated for the current step.
				 */
				step(data) {
					prevForms[location.pathname] = form
					form = { ...form, ...data}
					// @ts-ignore
					handlers.get(location.pathname)(form)
				}
			}
		}
	}
	return utils
}