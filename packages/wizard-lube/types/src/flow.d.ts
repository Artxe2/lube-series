declare function _default(base?: string): {
    /**
     * Adds a form handler for the specified `pathname`.
     * @param {string} pathname The relative URL path for the handler.
     * @param {(data: Record<string, *>) => void} handler
     * The function that handles the form data for the specified `location.pathname`.
     * @returns The `Flow` object for method chaining.
     */
    add(pathname: string, handler: (data: Record<string, any>) => void): any;
    /**
     * Begins the form processing and returns an object with methods to manage the form data.
     * @returns An object containing methods to interact with the form data and step through the wizard.
     */
    begin: () => {
        /**
         * Retrieves the current form data.
         * @returns The current form data as an object with string keys and any values.
         */
        data: () => Record<string, any>;
        /**
         * A function that update data from the previous step for `popState`.
         * @throws Error("No information from previous data.")
         * -- Failed to get previous data to current `location.pathname`
         */
        footprint(): void;
        /**
         * Forward the form data updated with the `data`
         * you received to the data handler corresponding to the current `location.pathname`.
         * @param {Record<string, *>} data The form data to be updated for the current step.
         */
        step(data: Record<string, any>): void;
    };
};
export default _default;
//# sourceMappingURL=flow.d.ts.map