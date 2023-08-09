import { flow } from "wizard-lube"

// @ts-ignore
globalThis.location = {
	pathname: "/a"
}

/**
 * @param {string} pathname
 */
const goto = pathname => {
	location.pathname = pathname
}

const myFlow = flow()
		.add("a", data => {
			goto("/b")
		})
		.add("b", data => {
			goto("/c")
		})
		.add("c", data => {
			goto("/d")
		})
		.begin()

console.log("Assert init:", JSON.stringify(myFlow.data()) == "{}")

myFlow.step({ firstName: "James", lastName: "Smith" })
console.log(
	"Assert [Name]:",
	location.pathname == "/b"
	&& JSON.stringify(myFlow.data()) == `{"firstName":"James","lastName":"Smith"}`
)

myFlow.step({ eMail: "user@domain.com", phone: "010-1234-5678" })
console.log(
	"Assert [Contact Info]:",
	location.pathname == "/c"
	&& JSON.stringify(myFlow.data()) == `{"firstName":"James","lastName":"Smith","eMail":"user@domain.com","phone":"010-1234-5678"}`
)

myFlow.step({ birthday: "1970-01-01" })
console.log(
	"Assert [Birthday]:",
	location.pathname == "/d"
	&& JSON.stringify(myFlow.data()) == `{"firstName":"James","lastName":"Smith","eMail":"user@domain.com","phone":"010-1234-5678","birthday":"1970-01-01"}`
)

goto("/b")
myFlow.footprint()
console.log(
	"Assert [Go back]:",
	location.pathname == "/b"
	&& JSON.stringify(myFlow.data()) == `{"firstName":"James","lastName":"Smith"}`
)

myFlow.step({ eMail: "user2@domain.com", phone: "010-1234-1234" })
console.log(
	"Assert [Contact Info 2]:",
	location.pathname == "/c"
	&& JSON.stringify(myFlow.data()) == `{"firstName":"James","lastName":"Smith","eMail":"user2@domain.com","phone":"010-1234-1234"}`
)

myFlow.step({ birthday: "2222-02-02" })
console.log(
	"Assert [Birthday 2]:",
	location.pathname == "/d"
	&& JSON.stringify(myFlow.data()) == `{"firstName":"James","lastName":"Smith","eMail":"user2@domain.com","phone":"010-1234-1234","birthday":"2222-02-02"}`
)