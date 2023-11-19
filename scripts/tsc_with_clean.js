import {
	readdirSync,
	rmdirSync,
	statSync,
	unlinkSync
} from "node:fs"

import { exec } from "node:child_process"
import { fileURLToPath } from "node:url"
import path from "node:path"

const dir = fileURLToPath(new URL("..", import.meta.url))
const pacakge_path = `${dir}/packages/${process.argv[2]}`
const current_time = Date.now()

exec(
	`cd ${pacakge_path} && tsc`,
	() => {
		/**
		 * @param {string} dir_path
		 * @returns {void}
		 */
		function clean_dir(dir_path) {
			const files = readdirSync(dir_path)
			let length = files.length
			for (const file of files) {
				const file_path = path.join(dir_path, file)
				const stat = statSync(file_path)
				if (stat.isDirectory()) clean_dir(file_path)
				else {
					const modified_time = new Date(stat.mtime).getTime()
					if (modified_time < current_time) {
						unlinkSync(file_path)
						length--
					}
				}
			}
			if (!length) rmdirSync(dir_path)
		}
		clean_dir(pacakge_path + "/types")
	}
)