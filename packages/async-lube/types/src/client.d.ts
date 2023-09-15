declare function _default(url: string, set_abort?: ((abort: VoidFunction) => void) | undefined): {
    /**
     * HTTP GET method.
     * @param {RequestInit} [options] Optional configuration options for the request.
     * @returns An object containing the `query` function for call `Fetch` with query parameters.
     */
    get: (options?: RequestInit | undefined) => {
        /**
         * Function for making a GET fetch request with optional data and headers.
         *
         * Returns a Promise containing the response.
         * @param {Record<string, string | number>} [data] Optional data to be sent with the GET request.
         * @param {Record<string, string>} [headers] Optional headers to be included in the GET request.
         * @returns A Promise containing the response.
         */
        query: (data?: Record<string, string | number> | undefined, headers?: Record<string, string> | undefined) => Promise<Response>;
    };
    /**
     * HTTP DELETE method.
     * @param {RequestInit} [options] Optional configuration options for the request.
     * @returns An object containing the `json`, `multiPart`, `urlEncoded` function
     * for call `Fetch` with body parameters.
     */
    delete: (options?: RequestInit | undefined) => {
        /**
         * Function for making a JSON fetch request with optional data and headers.
         * @param {Record<string, string | number>} [data] Optional data to be sent with the JSON request.
         * @param {Record<string, string>} [headers] Optional headers to be included in the JSON request.
         * @returns A Promise containing the response.
         */
        json: (data?: Record<string, string | number> | undefined, headers?: Record<string, string> | undefined) => Promise<Response>;
        /**
         * Function for making a multipart fetch request with optional data and headers.
         *
         * Accepts File objects as values in the `data` parameter.
         * @param {Record<string, string | Blob>} [data] Optional data to be sent with the multipart request.
         * @param {Record<string, string>} [headers] Optional headers to be included in the multipart request.
         * @returns A Promise containing the response.
         */
        multiPart: (data?: Record<string, string | Blob> | undefined, headers?: Record<string, string> | undefined) => Promise<Response>;
        /**
         * Function for making a URL-encoded fetch request with optional data and headers.
         * @param  {Record<string, string | number>} [data] Optional data to be sent with the URL-encoded request.
         * @param {Record<string, string>} [headers] Optional headers to be included in the URL-encoded request.
         * @returns A Promise containing the response.
         */
        urlEncoded: (data?: Record<string, string | number> | undefined, headers?: Record<string, string> | undefined) => Promise<Response>;
    };
    /**
     * HTTP HEAD method.
     * @param {RequestInit} [options] Optional configuration options for the request.
     * @returns An object containing the `json`, `multiPart`, `urlEncoded` function
     * for call `Fetch` with body parameters.
     */
    head: (options?: RequestInit | undefined) => {
        /**
         * Function for making a JSON fetch request with optional data and headers.
         * @param {Record<string, string | number>} [data] Optional data to be sent with the JSON request.
         * @param {Record<string, string>} [headers] Optional headers to be included in the JSON request.
         * @returns A Promise containing the response.
         */
        json: (data?: Record<string, string | number> | undefined, headers?: Record<string, string> | undefined) => Promise<Response>;
        /**
         * Function for making a multipart fetch request with optional data and headers.
         *
         * Accepts File objects as values in the `data` parameter.
         * @param {Record<string, string | Blob>} [data] Optional data to be sent with the multipart request.
         * @param {Record<string, string>} [headers] Optional headers to be included in the multipart request.
         * @returns A Promise containing the response.
         */
        multiPart: (data?: Record<string, string | Blob> | undefined, headers?: Record<string, string> | undefined) => Promise<Response>;
        /**
         * Function for making a URL-encoded fetch request with optional data and headers.
         * @param  {Record<string, string | number>} [data] Optional data to be sent with the URL-encoded request.
         * @param {Record<string, string>} [headers] Optional headers to be included in the URL-encoded request.
         * @returns A Promise containing the response.
         */
        urlEncoded: (data?: Record<string, string | number> | undefined, headers?: Record<string, string> | undefined) => Promise<Response>;
    };
    /**
     * HTTP OPTIONS method.
     * @param {RequestInit} [options] Optional configuration options for the request.
     * @returns An object containing the `json`, `multiPart`, `urlEncoded` function
     * for call `Fetch` with body parameters.
     */
    options: (options?: RequestInit | undefined) => {
        /**
         * Function for making a JSON fetch request with optional data and headers.
         * @param {Record<string, string | number>} [data] Optional data to be sent with the JSON request.
         * @param {Record<string, string>} [headers] Optional headers to be included in the JSON request.
         * @returns A Promise containing the response.
         */
        json: (data?: Record<string, string | number> | undefined, headers?: Record<string, string> | undefined) => Promise<Response>;
        /**
         * Function for making a multipart fetch request with optional data and headers.
         *
         * Accepts File objects as values in the `data` parameter.
         * @param {Record<string, string | Blob>} [data] Optional data to be sent with the multipart request.
         * @param {Record<string, string>} [headers] Optional headers to be included in the multipart request.
         * @returns A Promise containing the response.
         */
        multiPart: (data?: Record<string, string | Blob> | undefined, headers?: Record<string, string> | undefined) => Promise<Response>;
        /**
         * Function for making a URL-encoded fetch request with optional data and headers.
         * @param  {Record<string, string | number>} [data] Optional data to be sent with the URL-encoded request.
         * @param {Record<string, string>} [headers] Optional headers to be included in the URL-encoded request.
         * @returns A Promise containing the response.
         */
        urlEncoded: (data?: Record<string, string | number> | undefined, headers?: Record<string, string> | undefined) => Promise<Response>;
    };
    /**
     * HTTP PATCH method.
     * @param {RequestInit} [options] Optional configuration options for the request.
     * @returns An object containing the `json`, `multiPart`, `urlEncoded` function
     * for call `Fetch` with body parameters.
     */
    patch: (options?: RequestInit | undefined) => {
        /**
         * Function for making a JSON fetch request with optional data and headers.
         * @param {Record<string, string | number>} [data] Optional data to be sent with the JSON request.
         * @param {Record<string, string>} [headers] Optional headers to be included in the JSON request.
         * @returns A Promise containing the response.
         */
        json: (data?: Record<string, string | number> | undefined, headers?: Record<string, string> | undefined) => Promise<Response>;
        /**
         * Function for making a multipart fetch request with optional data and headers.
         *
         * Accepts File objects as values in the `data` parameter.
         * @param {Record<string, string | Blob>} [data] Optional data to be sent with the multipart request.
         * @param {Record<string, string>} [headers] Optional headers to be included in the multipart request.
         * @returns A Promise containing the response.
         */
        multiPart: (data?: Record<string, string | Blob> | undefined, headers?: Record<string, string> | undefined) => Promise<Response>;
        /**
         * Function for making a URL-encoded fetch request with optional data and headers.
         * @param  {Record<string, string | number>} [data] Optional data to be sent with the URL-encoded request.
         * @param {Record<string, string>} [headers] Optional headers to be included in the URL-encoded request.
         * @returns A Promise containing the response.
         */
        urlEncoded: (data?: Record<string, string | number> | undefined, headers?: Record<string, string> | undefined) => Promise<Response>;
    };
    /**
     * HTTP POST method.
     * @param {RequestInit} [options] Optional configuration options for the request.
     * @returns An object containing the `json`, `multiPart`, `urlEncoded` function
     * for call `Fetch` with body parameters.
     */
    post: (options?: RequestInit | undefined) => {
        /**
         * Function for making a JSON fetch request with optional data and headers.
         * @param {Record<string, string | number>} [data] Optional data to be sent with the JSON request.
         * @param {Record<string, string>} [headers] Optional headers to be included in the JSON request.
         * @returns A Promise containing the response.
         */
        json: (data?: Record<string, string | number> | undefined, headers?: Record<string, string> | undefined) => Promise<Response>;
        /**
         * Function for making a multipart fetch request with optional data and headers.
         *
         * Accepts File objects as values in the `data` parameter.
         * @param {Record<string, string | Blob>} [data] Optional data to be sent with the multipart request.
         * @param {Record<string, string>} [headers] Optional headers to be included in the multipart request.
         * @returns A Promise containing the response.
         */
        multiPart: (data?: Record<string, string | Blob> | undefined, headers?: Record<string, string> | undefined) => Promise<Response>;
        /**
         * Function for making a URL-encoded fetch request with optional data and headers.
         * @param  {Record<string, string | number>} [data] Optional data to be sent with the URL-encoded request.
         * @param {Record<string, string>} [headers] Optional headers to be included in the URL-encoded request.
         * @returns A Promise containing the response.
         */
        urlEncoded: (data?: Record<string, string | number> | undefined, headers?: Record<string, string> | undefined) => Promise<Response>;
    };
    /**
     * HTTP PUT method.
     * @param {RequestInit} [options] Optional configuration options for the request.
     * @returns An object containing the `json`, `multiPart`, `urlEncoded` function
     * for call `Fetch` with body parameters.
     */
    put: (options?: RequestInit | undefined) => {
        /**
         * Function for making a JSON fetch request with optional data and headers.
         * @param {Record<string, string | number>} [data] Optional data to be sent with the JSON request.
         * @param {Record<string, string>} [headers] Optional headers to be included in the JSON request.
         * @returns A Promise containing the response.
         */
        json: (data?: Record<string, string | number> | undefined, headers?: Record<string, string> | undefined) => Promise<Response>;
        /**
         * Function for making a multipart fetch request with optional data and headers.
         *
         * Accepts File objects as values in the `data` parameter.
         * @param {Record<string, string | Blob>} [data] Optional data to be sent with the multipart request.
         * @param {Record<string, string>} [headers] Optional headers to be included in the multipart request.
         * @returns A Promise containing the response.
         */
        multiPart: (data?: Record<string, string | Blob> | undefined, headers?: Record<string, string> | undefined) => Promise<Response>;
        /**
         * Function for making a URL-encoded fetch request with optional data and headers.
         * @param  {Record<string, string | number>} [data] Optional data to be sent with the URL-encoded request.
         * @param {Record<string, string>} [headers] Optional headers to be included in the URL-encoded request.
         * @returns A Promise containing the response.
         */
        urlEncoded: (data?: Record<string, string | number> | undefined, headers?: Record<string, string> | undefined) => Promise<Response>;
    };
};
export default _default;
//# sourceMappingURL=client.d.ts.map