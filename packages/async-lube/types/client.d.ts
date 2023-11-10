declare function _default(url: string, set_abort?: ((abort: VoidFunction) => void) | undefined): {
    /**
     * HTTP DELETE method.
     * @param {RequestInit=} options
     * @returns {ReturnType<typeof set_options_body>}
     */
    delete: (options?: RequestInit | undefined) => ReturnType<typeof set_options_body>;
    /**
     * HTTP GET method.
     * @param {RequestInit=} options
     * @returns {{
     *   query(data?: Record<string, string | number>, headers?: Record<string, string>): Promise<Response>
     * }}
     */
    get: (options?: RequestInit | undefined) => {
        query(data?: Record<string, string | number>, headers?: Record<string, string>): Promise<Response>;
    };
    /**
     * HTTP HEAD method.
     * @param {RequestInit=} options
     * @returns {ReturnType<typeof set_options_body>}
     */
    head: (options?: RequestInit | undefined) => ReturnType<typeof set_options_body>;
    /**
     * HTTP OPTIONS method.
     * @param {RequestInit=} options
     * @returns {ReturnType<typeof set_options_body>}
     */
    options: (options?: RequestInit | undefined) => ReturnType<typeof set_options_body>;
    /**
     * HTTP PATCH method.
     * @param {RequestInit=} options
     * @returns {ReturnType<typeof set_options_body>}
     */
    patch: (options?: RequestInit | undefined) => ReturnType<typeof set_options_body>;
    /**
     * HTTP POST method.
     * @param {RequestInit=} options
     * @returns {ReturnType<typeof set_options_body>}
     */
    post: (options?: RequestInit | undefined) => ReturnType<typeof set_options_body>;
    /**
     * HTTP PUT method.
     * @param {RequestInit=} options
     * @returns {ReturnType<typeof set_options_body>}
     */
    put: (options?: RequestInit | undefined) => ReturnType<typeof set_options_body>;
};
export default _default;
/**
 * @param {string} url
 * @param {"DELETE" | "HEAD" | "OPTIONS" | "PATCH" | "POST" | "PUT"} method
 * @param {(abort: VoidFunction) => void=} set_abort
 * @param {RequestInit=} options
 * @returns
 * ```
 * type Fetch = {
 *   json(data?, headers?): Promise<Response>
 *   multiPart(data?, headers?): Promise<Response>
 *   urlEncoded(data?, headers?): Promise<Response>
 * }
 * ```
 */
declare function set_options_body(url: string, method: "DELETE" | "HEAD" | "OPTIONS" | "PATCH" | "POST" | "PUT", set_abort?: ((abort: VoidFunction) => void) | undefined, options?: RequestInit | undefined): {
    /**
     * Function for making a JSON fetch request with optional data and headers.
     * @param {Record<string, string | number>=} data
     * @param {Record<string, string>=} headers
     * @returns {Promise<Response>}
     */
    json: (data?: Record<string, string | number> | undefined, headers?: Record<string, string> | undefined) => Promise<Response>;
    /**
     * Function for making a multipart fetch request with optional data and headers.
     * @param {Record<string, string | number | Blob>=} data
     * @param {Record<string, string>=} headers
     * @returns {Promise<Response>}
     */
    multiPart: (data?: Record<string, string | number | Blob> | undefined, headers?: Record<string, string> | undefined) => Promise<Response>;
    /**
     * Function for making a URL-encoded fetch request with optional data and headers.
     * @param  {Record<string, string | number>=} data
     * @param {Record<string, string>=} headers
     * @returns {Promise<Response>}
     */
    urlEncoded: (data?: Record<string, string | number> | undefined, headers?: Record<string, string> | undefined) => Promise<Response>;
};
//# sourceMappingURL=client.d.ts.map