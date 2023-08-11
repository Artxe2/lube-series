const tests = [ "add", "date_to_string", "string_to_date", "time_unit", "time_zone" ]
for (const t of tests) {
	console.log(new Array(49 - t.length).fill("=").join(""), t)
	await import("./" + t + ".test.js")
}
console.log(new Array(50).fill("=").join("") )