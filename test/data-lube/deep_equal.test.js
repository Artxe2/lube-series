import { assert, describe, it } from "vitest"

import { deepEqual as deep_equal } from "data-lube"

describe(
	"deep_equal",
	() => {
		const dimensions = [{
			"dimensions": [{
				"runtime": {
					"common": {
						"client": 1,
						"server": "a"
					}
				}
			}, {
				"device": {
					"android": null,
					"blackberry": null,
					"iemobile": null,
					"ipad": null,
					"iphone": null,
					"kindle": null,
					"opera-mini": null,
					"palm": null
				}
			}, {
				"environment": {
					"development": {
						"dev": null,
						"test": null
					},
					"production": {
						"prod": null,
						"stage": null
					}
				}
			}, {
				"lang": {
					"ar": {
						"ar-EG": null,
						"ar-JO": null,
						"ar-MA": null,
						"ar-SA": null
					},
					"bn": {
						"bn-IN": null
					},
					"ca": {
						"ca-ES": null
					},
					"cs": {
						"cs-CZ": null
					},
					"da": {
						"da-DK": null
					},
					"de": {
						"de-AT": null,
						"de-DE": null
					},
					"el": {
						"el-GR": null
					},
					"en": {
						"en-AU": null,
						"en-BG": null,
						"en-CA": null,
						"en-GB": null,
						"en-GY": null,
						"en-HK": null,
						"en-IE": null,
						"en-IN": null,
						"en-MY": null,
						"en-NZ": null,
						"en-PH": null,
						"en-SG": null,
						"en-US": null,
						"en-ZA": null
					},
					"es": {
						"es-AR": null,
						"es-BO": null,
						"es-CL": null,
						"es-CO": null,
						"es-EC": null,
						"es-ES": null,
						"es-MX": null,
						"es-PE": null,
						"es-PY": null,
						"es-US": null,
						"es-UY": null,
						"es-VE": null
					},
					"fi": {
						"fi-FI": null
					},
					"fr": {
						"fr-BE": null,
						"fr-CA": null,
						"fr-FR": null,
						"fr-GF": null
					},
					"hi": {
						"hi-IN": null
					},
					"hu": {
						"hu-HU": null
					},
					"id": {
						"id-ID": null
					},
					"it": {
						"it-IT": null
					},
					"ja": {
						"ja-JP": null
					},
					"kn": {
						"kn-IN": null
					},
					"ko": {
						"ko-KR": null
					},
					"ml": {
						"ml-IN": null
					},
					"mr": {
						"mr-IN": null
					},
					"ms": {
						"ms-MY": null
					},
					"nb": {
						"nb-NO": null
					},
					"nl": {
						"nl-BE": null,
						"nl-NL": null,
						"nl-SR": null
					},
					"pl": {
						"pl-PL": null
					},
					"pt": {
						"pt-BR": null
					},
					"ro": {
						"ro-RO": null
					},
					"ru": {
						"ru-RU": null
					},
					"sv": {
						"sv-SE": null
					},
					"ta": {
						"ta-IN": null
					},
					"te": {
						"te-IN": null
					},
					"th": {
						"th-TH": null
					},
					"tr": {
						"tr-TR": null
					},
					"vi": {
						"vi-VN": null
					},
					"zh": {
						"zh-Hans": {
							"zh-Hans-CN": null
						},
						"zh-Hant": {
							"zh-Hant-HK": null,
							"zh-Hant-TW": null
						}
					}
				}
			}]
		}]

		it(
			"check literals",
			() => {
				assert.isTrue(deep_equal(undefined, void 0))
				assert.isTrue(deep_equal(null, null))
				assert.isTrue(deep_equal(true, true))
				assert.isTrue(deep_equal(123, 123))
				assert.isTrue(deep_equal("abc", "abc"))
				assert.isTrue(deep_equal({}, {}))
				assert.isTrue(deep_equal([], []))

				assert.isFalse(deep_equal({a: void 0}, {b: 1}))
				assert.isFalse(deep_equal({a: 1}, {b: void 0}))
				assert.isFalse(deep_equal(null, undefined))
				assert.isFalse(deep_equal(true, false))
				assert.isFalse(deep_equal(123, 456))
				assert.isFalse(deep_equal("abc", "xyz"))
				assert.isFalse(deep_equal("123", 123))
				assert.isFalse(deep_equal("abc", ["a", "b", "c"]))
				assert.isFalse(deep_equal({}, null))
				assert.isFalse(deep_equal({}, []))
			}
		)

		it(
			"check with JSON.stringify",
			() => {
				const copy = JSON.parse(
					JSON.stringify(dimensions)
				)
				assert.deepEqual(dimensions, copy)
				copy.push("extra")
				assert.notDeepEqual(dimensions, copy)
			}
		)
	}
)