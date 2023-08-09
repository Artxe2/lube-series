import { add } from "date-lube"

const startDate = new Date("2222-03-04T11:22:33.444Z")

add(startDate, "-1Y 2M")
add(startDate, "-3D5H6m 7sasdf-8sss")
console.log("Assert add times:", startDate.getTime() - new Date("2221-05-01T16:28:40.436Z").getTime() === 0)