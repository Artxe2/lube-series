import { dateToString } from "./date-lube.js"

const date = new Date("2222-03-04T11:22:33.444")
const defaultString = dateToString(date)
const formattedString = dateToString(date, "HHhmmmssSsss _ YYYY/MM/DD").replace("S", "s")

console.log("Assert default equals:", defaultString === "2222-03-04T11:22:33.444")
console.log("Assert formatted equals:", formattedString === "11h22m33s444 _ 2222/03/04")