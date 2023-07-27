type Data = { [x: string]: string | number }
type Options = {
	mode?: "no-cors" | "cors" | "same-origin"
	cache?: "default" | "no-cache" | "reload" | "force-cache" | "only-if-cached"
	credentials?: "include" | "same-origin" | "omit"
	redirect: "manual" | "follow" | "error"
	referrerPolicy: "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url"
}
type GetFetch = (data?: { [x: string]: string | number }, headers?: Data) => Promise<Response>
type SetOptionsBody = {
	json: GetFetch
	multiPart: (data?: { [x: string]: string | number | File }, headers?: Data) => Promise<Response>
	urlEncoded: GetFetch
}
declare module "fetch-lube" {
	const client: (url: string, setAbort?: (abort: Function) => void) => {
		get: (options?: Options) => {
			query: GetFetch
		}
		delete: (options?: Options) => SetOptionsBody
		head: (options?: Options) => SetOptionsBody
		options: (options?: Options) => SetOptionsBody
		post: (options?: Options) => SetOptionsBody
		put: (options?: Options) => SetOptionsBody
		patch: (options?: Options) => SetOptionsBody
	}
}