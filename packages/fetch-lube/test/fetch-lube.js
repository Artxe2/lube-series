let e = encodeURIComponent
let ctrl = AbortController
let toQuery = (data) => {
	let query = ""
	if (data) {
		for (let key in data) {
			query += (query ? "&" : "") + e(key) + "=" + e(data[key])
		}
	}
	return query;
}
let toFormData = data => {
	if (data) {
		let formData = new FormData()
		for (let key in data) formData.append(key, data[key])
		return formData
	}
}
let pathVariableRE = /:[a-zA-Z0-9]+/g
let setPathVariablesInURL = (url, data) => url.replace(pathVariableRE, s => {
	s = s.slice(1)
	let v = data[s]
	delete data[s]
	return v
})
let getFetchQuery = (url, setAbort, options, data, headers) => {
	options.headers = headers
	if (setAbort) {
		let controller = new ctrl()
		setAbort(() => controller.abort())
		options.signal = controller.signal
	}
	return fetch(url + (data ? "?" + data : ""), options)
}
let getFetchBody = (url, setAbort, method, options, contentType, body, headers = {}) => {
	headers["Content-Type"] = contentType
	options.method = method
	options.headers = headers
	options.body = body
	if (setAbort) {
		let controller = new ctrl()
		setAbort(() => controller.abort())
		options.signal = controller.signal
	}
	return fetch(url, options)
}
let setOptionsBody = (url, setAbort, method, options = {}) => ({
	json: (data, headers) => getFetchBody(setPathVariablesInURL(url, data), setAbort, method, options, "application/json;charset=UTF-8", JSON.stringify(data), headers),
	multiPart: (data, headers) => getFetchBody(setPathVariablesInURL(url, data), setAbort, method, options, "multipart/form-data;charset=UTF-8", toFormData(data), headers),
	urlEncoded: (data, headers) => getFetchBody(setPathVariablesInURL(url, data), setAbort, method, options, "application/x-www-form-urlencoded;charset=UTF-8", toQuery(data), headers)
})
let client = (url, setAbort) => ({
	get: (options = {}) => ({
		query: (data, headers) => getFetchQuery(setPathVariablesInURL(url, data), setAbort, options, toQuery(data), headers)
	}),
	delete: options => setOptionsBody(url, setAbort, "DELETE", options),
	head: options => setOptionsBody(url, setAbort, "HEAD", options),
	options: options => setOptionsBody(url, setAbort, "OPTIONS", options),
	post: options => setOptionsBody(url, setAbort, "POST", options),
	put: options => setOptionsBody(url, setAbort, "PUT", options),
	patch: options => setOptionsBody(url, setAbort, "PATCH", options)
})

export { client }