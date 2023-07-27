import { stringToDate } from "./date-lube.js"

const defaultDate = stringToDate("2222-03-04T11:22:33.444")
const formattedDate = stringToDate("11h22m33s444 _ 2222/03/04", "HH mm ss sss _ YYYY MM DD")

console.log("Assert equals default & formatted:", defaultDate - formattedDate === 0)