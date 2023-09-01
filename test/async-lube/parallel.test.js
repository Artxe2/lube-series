import {
	assert, describe, it 
} from "vitest"

import { parallel } from "async-lube"

describe(
	"parallel",
	() => {
		const now = Date.now()
		/**
		 * @param {number} ms
		 */
		const wait = ms => new Promise((resolve, reject) => {
			const start = Date.now() - now
			setTimeout(
				() => {
					const end = Date.now() - now
					;(ms % 2 ? resolve : reject)({
						ms,
						start,
						end 
					})
				},
				ms
			)
		})

		it(
			"result order and duration",
			async () => {
				const value = await parallel(
					3,
					() => wait(101),
					() => wait(300),
					() => wait(501),
					() => wait(100),
					() => wait(201),
					() => wait(300),
					() => wait(401)
				)
				for (const v of value) {
					if (v.value?.ms != null) {
						v.value.ms = parseInt(String(v.value.ms / 100))
						v.value.start = parseInt(String(v.value.start / 100))
						v.value.end = parseInt(String(v.value.end / 100))
					} else {
						v.reason.ms = parseInt(String(v.reason.ms / 100))
						v.reason.start = parseInt(String(v.reason.start / 100))
						v.reason.end = parseInt(String(v.reason.end / 100))
					}
				}
				assert.deepEqual(
					value[0],
					{
						value: {
							ms: 1,
							start: 0,
							end: 1 
						} 
					}
				)
				assert.deepEqual(
					value[1],
					{
						reason: {
							ms: 3,
							start: 0,
							end: 3 
						} 
					}
				)
				assert.deepEqual(
					value[2],
					{
						value: {
							ms: 5,
							start: 0,
							end: 5 
						} 
					}
				)
				assert.deepEqual(
					value[3],
					{
						reason: {
							ms: 1,
							start: 1,
							end: 2 
						} 
					}
				)
				assert.deepEqual(
					value[4],
					{
						value: {
							ms: 2,
							start: 2,
							end: 4 
						} 
					}
				)
				assert.deepEqual(
					value[5],
					{
						reason: {
							ms: 3,
							start: 3,
							end: 6 
						} 
					}
				)
				assert.deepEqual(
					value[6],
					{
						value: {
							ms: 4,
							start: 4,
							end: 8 
						} 
					}
				)
			}
		)
	}
)