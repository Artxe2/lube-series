import { add } from "./date-lube.js"

const startDate = new Date("2222-03-04T11:22:33.444Z")

add(startDate, "-1YYYY 2MM")
add(startDate, "-3DD5HH6mm 7ssasdf-8sss")
console.log("Assert add times:", startDate - new Date("2221-05-01T16:28:40.436Z") === 0)