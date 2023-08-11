const tests = [ "abort", "get", "http_status", "post" ]
for (const t of tests) {
	console.log(new Array(49 - t.length).fill("=").join(""), t)
	await import("./" + t + ".test.js")
}
console.log( new Array(50).fill("=").join("") )