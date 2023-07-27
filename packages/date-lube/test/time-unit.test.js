import { timeUnit } from "./date-lube.js"

console.log("Assert DD == 24HH:", timeUnit.DD === timeUnit.HH * 24)
console.log("Assert HH == 24mm:", timeUnit.HH === timeUnit.mm * 60)
console.log("Assert mm == 60ss:", timeUnit.mm === timeUnit.ss * 60)
console.log("Assert ss == 1000ms:", timeUnit.ss === 1000)