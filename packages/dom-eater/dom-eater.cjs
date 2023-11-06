'use strict';

const E = Error;

/**
 * @param {string} message
 * @param {number} start
 * @param {number} end
 * @returns {Error & { name: "AstSyntaxError", start: number, end: number }}
 */
var AstSyntaxError = (message, start, end) => {
	/** @type {Error & { start?: number, end?: number }} */
	const error = E(message);
	error.name = "AstSyntaxError";
	error.start = start;
	error.end = end;
	return /** @type {Error & { name: "AstSyntaxError", start: number, end: number }} */(error)/**/
};

const self_closing_element_regex = /^(?:area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr|!DOCTYPE)$/;

/**
 * @param {string} text
 * @param {import("../../../public.js").AstNode[]} ast_nodes
 * @param {import("../../../public.js").AstSyntaxError[]}  errors
 * @param {import("../../../public.js").Element} element
 * @returns {void}
 */
var normalize_element_children = (text, ast_nodes, errors, element) => {
	const name = element.name;
	if (self_closing_element_regex.test(name)) return
	const length = ast_nodes.length;
	for (let i = 0; i < length; i++) {
		const token = ast_nodes[i];
		if (token.type == "Element" && token.name == name) {
			if (token.subType == "close") {
				element.end = token.end;
				const children = ast_nodes.splice(0, i);
				ast_nodes.shift();
				if (children.length) {
					element.children = children;
					normalize_nodes(text, children, errors);
				}
			} else {
				errors.push(
					AstSyntaxError(
						`The "${name}" Element is not closed.`,
						element.start,
						element.end
					)
				);
			}
			return
		}
	}
	errors.push(
		AstSyntaxError(
			`The "${name}" Element is not closed.`,
			element.start,
			element.end
		)
	);
};

/**
 * @param {string} text
 * @param {import("../../../public.js").AstNode[]} ast_nodes
 * @param {import("../../../public.js").AstSyntaxError[]} errors
 * @returns {void}
 */
var normalize_nodes = (text, ast_nodes, errors) => {
	/** @type {import("../../../public.js").AstNode[]} */
	const ast = [];
	while (ast_nodes.length > 0) {
		const node = /** @type {import("../../../public.js").AstNode} */(ast_nodes.shift());/**/
		ast.push(node);
		if (node.type == "Element" && node.name != "script" && node.name != "style") {
			if (node.subType == "close") {
				errors.push(
					AstSyntaxError(
						`unopened Element "${node.name}" cannot be closed.`,
						node.start,
						node.end
					)
				);
			} else if (node.subType == "open") {
				normalize_element_children(text, ast_nodes, errors, node);
			}
		}
	}
	ast_nodes.push(...ast);
};

const end_double_quotes_regex$1 = /(?<=(?<!\\)(?:\\\\)*)"/;

/**
 * @param {string} text
 * @param {import("../../../public.js").AstSyntaxError[]} errors
 * @param {number} start
 * @returns {import("../../../public.js").String & { subType: "double" }}
 */
var parse_script_double_quotes$1 = (text, errors, start) => {
	const index = text.slice(start + 1).search(end_double_quotes_regex$1) + 1;
	if (index > 0) {
		return {
			end: start + index + 1,
			scripts: [],
			start,
			subType: "double",
			type: "String"
		}
	}
	errors.push(
		AstSyntaxError(
			"parse_script_double_quotes is incomplete.",
			start,
			text.length
		)
	);
	return {
		end: text.length,
		scripts: [],
		start,
		subType: "double",
		type: "String"
	}
};

const end_single_quotes_regex$1 = /(?<=(?<!\\)(?:\\\\)*)'/;

/**
 * @param {string} text
 * @param {import("../../../public.js").AstSyntaxError[]} errors
 * @param {number} start
 * @returns {import("../../../public.js").String & { subType: "single" }}
 */
var parse_script_single_quotes$1 = (text, errors, start) => {
	const index = text.slice(start + 1).search(end_single_quotes_regex$1) + 1;
	if (index > 0) {
		return {
			end: start + index + 1,
			scripts: [],
			start,
			subType: "single",
			type: "String"
		}
	}
	errors.push(
		AstSyntaxError(
			"parse_script_single_quotes is incomplete.",
			start,
			text.length
		)
	);
	return {
		end: text.length,
		scripts: [],
		start,
		subType: "single",
		type: "String"
	}
};

const stop_script_block_regex$3 = /[{}'"`]/;
/**
 * @param {string} text
 * @param {import("../../../public.js").AstSyntaxError[]} errors
 * @param {number} start
 * @returns {import("../../../public.js").Script & { subType: "template" }}
 */
var parse_script_template$1 = (text, errors, start) => {
	let child_pre_index = start + 2;
	/** @type {import("../../../public.js").String[]} */
	const strings = [];
	for (;;) {
		const child_index = text.slice(child_pre_index).search(stop_script_block_regex$3);
		if (child_index >= 0) {
			const index = child_pre_index + child_index;
			if (text[index] == "}") {
				return {
					end: index + 1,
					start,
					strings,
					subType: "template",
					type: "Script"
				}
			}
			if (text[index] == "{") {
				const node = parse_script_block$1(text, errors, index);
				for (const str of node.strings) {
					strings.push(str);
				}
				child_pre_index = node.end;
			} else if (text[index] == "'") {
				const node = parse_script_single_quotes$1(text, errors, index);
				strings.push(node);
				child_pre_index = node.end;
			} else if (text[index] == "\"") {
				const node = parse_script_double_quotes$1(text, errors, index);
				strings.push(node);
				child_pre_index = node.end;
			} else {
				const node = parse_script_backticks$1(text, errors, index);
				strings.push(node);
				child_pre_index = node.end;
			}
		} else {
			errors.push(
				AstSyntaxError(
					"parse_script_template is incomplete.",
					start,
					text.length
				)
			);
			return {
				end: text.length,
				start,
				strings,
				subType: "template",
				type: "Script"
			}
		}
	}
};

const stop_backtick_regex$1 = /(?<=(?<!\\)(?:\\\\)*)(?:`|\${)/;

/**
 * @param {string} text
 * @param {import("../../../public.js").AstSyntaxError[]} errors
 * @param {number} start
 * @returns {import("../../../public.js").String & { subType: "backtick" }}
 */
var parse_script_backticks$1 = (text, errors, start) => {
	let child_pre_index = start + 1;
	/** @type {import("../../../public.js").Script[]} */
	const scripts = [];
	for (;;) {
		const child_index = text.slice(child_pre_index).search(stop_backtick_regex$1);
		if (child_index >= 0) {
			const index = child_pre_index + child_index;
			if (text[index] == "`") {
				return {
					end: index + 1,
					scripts,
					start,
					subType: "backtick",
					type: "String"
				}
			}
			const node = parse_script_template$1(text, errors, index);
			scripts.push(node);
			child_pre_index = node.end;
		} else {
			errors.push(
				AstSyntaxError(
					"parse_script_backticks is incomplete.",
					start,
					text.length
				)
			);
			return {
				end: text.length,
				scripts,
				start,
				subType: "backtick",
				type: "String"
			}
		}
	}
};

const stop_script_block_regex$2 = /[{}'"`]/;

/**
 * @param {string} text
 * @param {import("../../../public.js").AstSyntaxError[]} errors
 * @param {number} start
 * @returns {import("../../../public.js").Script & { subType: "block" }}
 */
const parse_script_block$1 = (text, errors, start) => {
	let child_pre_index = start + 1;
	/** @type {import("../../../public.js").String[]} */
	const strings = [];
	for (;;) {
		const child_index = text.slice(child_pre_index).search(stop_script_block_regex$2);
		if (child_index >= 0) {
			const index = child_pre_index + child_index;
			if (text[index] == "}") {
				return {
					end: index + 1,
					start,
					strings,
					subType: "block",
					type: "Script"
				}
			} else if (text[index] == "{") {
				const node = parse_script_block$1(text, errors, index);
				for (const str of node.strings) {
					strings.push(str);
				}
				child_pre_index = node.end;
			} else if (text[index] == "'") {
				const node = parse_script_single_quotes$1(text, errors, index);
				strings.push(node);
				child_pre_index = node.end;
			} else if (text[index] == "\"") {
				const node = parse_script_double_quotes$1(text, errors, index);
				strings.push(node);
				child_pre_index = node.end;
			} else {
				const node = parse_script_backticks$1(text, errors, index);
				strings.push(node);
				child_pre_index = node.end;
			}
		} else {
			errors.push(
				AstSyntaxError(
					"parse_script_block is incomplete.",
					start,
					text.length
				)
			);
			return {
				end: text.length,
				start,
				strings,
				subType: "block",
				type: "Script"
			}
		}
	}
};

const stop_attribute_single_quotes_regex$3 = /(?<=(?<!\\)(?:\\\\)*)["{]/;

/**
 * @param {string} text
 * @param {import("../../../public.js").AstSyntaxError[]} errors
 * @param {number} start
 * @returns {import("../../../public.js").String & { subType: "double" }}
 */
var parse_attribute_double_quotes$1 = (text, errors, start) => {
	let child_pre_index = start + 1;
	/** @type {import("../../../public.js").Script[]} */
	const scripts = [];
	for (;;) {
		const child_index = text.slice(child_pre_index).search(
			stop_attribute_single_quotes_regex$3
		);
		if (child_index >= 0) {
			const index = child_pre_index + child_index;
			if (text[index] == "\"") {
				return {
					end: index + 1,
					scripts,
					start,
					subType: "double",
					type: "String"
				}
			}
			const node = parse_script_block$1(text, errors, index);
			scripts.push(node);
			child_pre_index = node.end;
		} else {
			errors.push(
				AstSyntaxError(
					"parse_attribute_double_quotes is incomplete.",
					start,
					text.length
				)
			);
			return {
				end: text.length,
				scripts,
				start,
				subType: "double",
				type: "String"
			}
		}
	}
};

const stop_attribute_single_quotes_regex$2 = /(?<=(?<!\\)(?:\\\\)*)(?:'|{)/;

/**
 * @param {string} text
 * @param {import("../../../public.js").AstSyntaxError[]} errors
 * @param {number} start
 * @returns {import("../../../public.js").String & { subType: "single" }}
 */
var parse_attribute_single_quotes$1 = (text, errors, start) => {
	let child_pre_index = start + 1;
	/** @type {import("../../../public.js").Script[]} */
	const scripts = [];
	for (;;) {
		const child_index = text.slice(child_pre_index).search(
			stop_attribute_single_quotes_regex$2
		);
		if (child_index >= 0) {
			const index = child_pre_index + child_index;
			if (text[index] == "'") {
				return {
					end: index + 1,
					scripts,
					start,
					subType: "single",
					type: "String"
				}
			}
			const node = parse_script_block$1(text, errors, index);
			scripts.push(node);
			child_pre_index = node.end;
		} else {
			errors.push(
				AstSyntaxError(
					"parse_attribute_single_quotes is incomplete.",
					start,
					text.length
				)
			);
			return {
				end: text.length,
				scripts,
				start,
				subType: "single",
				type: "String"
			}
		}
	}
};

const stop_attribute_name_regex$1 = /[ =>]/;
const stop_space_regex$1 = /\S/;

/**
 * @param {string} text
 * @param {import("../../../public.js").AstSyntaxError[]} errors
 * @param {number} start
 * @returns {import("../../../public.js").Attribute}
 */
var parse_attribute$1 = (text, errors, start) => {
	if (text[start] == "{") {
		const node = parse_script_block$1(text, errors, start);
		return {
			end: node.end,
			name: "",
			start,
			type: "Attribute",
			value: node
		}
	}
	const name_index = text.slice(start + 1).search(stop_attribute_name_regex$1) + 1;
	if (name_index > 0) {
		const name = text.slice(start, start + name_index);
		/** @type {import("../../../public.js").Attribute} */
		const node = {
			end: start + name_index,
			name,
			start,
			type: "Attribute",
			value: true
		};
		const equals_sign_index = text.slice(start + name_index).search(stop_space_regex$1);
		if (equals_sign_index < 0 || text[start + name_index + equals_sign_index] != "=") return node
		const value_index = text.slice(
			start + name_index + equals_sign_index + 1
		).search(stop_space_regex$1) + 1;
		if (value_index > 0) {
			const index = start + name_index + equals_sign_index + value_index;
			if (text[index] == "'") {
				const value = parse_attribute_single_quotes$1(text, errors, index);
				node.value = value;
				node.end = value.end;
			} else if (text[index] == "\"") {
				const value = parse_attribute_double_quotes$1(text, errors, index);
				node.value = value;
				node.end = value.end;
			} else if (text[index] == "{") {
				const value = parse_script_block$1(text, errors, index);
				node.value = value;
				node.end = value.end;
			} else {
				errors.push(
					AstSyntaxError(
						`parse_attribute value is not valid with "${text[index]}"`,
						start,
						index
					)
				);
				node.end = index;
			}
		} else {
			errors.push(
				AstSyntaxError(
					"parse_attribute value is incomplete.",
					start,
					text.length
				)
			);
			node.end = text.length;
		}
		return node
	}
	errors.push(
		AstSyntaxError(
			"parse_attribute name is incomplete.",
			start,
			text.length
		)
	);
	return {
		end: text.length,
		name: text.slice(start),
		start: start,
		type: "Attribute",
		value: true
	}
};

const stop_script_content_regex = /[{'"`]|<\/script>/;

/**
 * @param {string} text
 * @param {import("../../../public.js").AstSyntaxError[]} errors
 * @param {number} start
 * @returns {import("../../../public.js").Script & { subType: "content" }}
 */
var parse_script_content = (text, errors, start) => {
	let child_pre_index = start;
	/** @type {import("../../../public.js").String[]} */
	const strings = [];
	for (;;) {
		const child_index = text.slice(child_pre_index).search(stop_script_content_regex);
		if (child_index >= 0) {
			const index = child_pre_index + child_index;
			if (text[index] == "<") {
				return {
					end: index,
					start,
					strings,
					subType: "content",
					type: "Script"
				}
			} else if (text[index] == "{") {
				const node = parse_script_block$1(text, errors, index);
				for (const str of node.strings) {
					strings.push(str);
				}
				child_pre_index = node.end;
			} else if (text[index] == "'") {
				const node = parse_script_single_quotes$1(text, errors, index);
				strings.push(node);
				child_pre_index = node.end;
			} else if (text[index] == "\"") {
				const node = parse_script_double_quotes$1(text, errors, index);
				strings.push(node);
				child_pre_index = node.end;
			} else {
				const node = parse_script_backticks$1(text, errors, index);
				strings.push(node);
				child_pre_index = node.end;
			}
		} else {
			errors.push(
				AstSyntaxError(
					"parse_script_content is incomplete.",
					start,
					text.length
				)
			);
			return {
				end: text.length,
				start,
				strings,
				subType: "content",
				type: "Script"
			}
		}
	}
};

const end_style_content_regex = /<\/style>/;

/**
 * @param {string} text
 * @param {import("../../../public.js").AstSyntaxError[]} errors
 * @param {number} start
 * @returns {import("../../../public.js").Style}
 */
var parse_style_content = (text, errors, start) => {
	const index = text.slice(start).search(end_style_content_regex);
	if (index >= 0) {
		return {
			end: start + index,
			start,
			type: "Style"
		}
	}
	errors.push(
		AstSyntaxError(
			"parse_style_content is incomplete.",
			start,
			text.length
		)
	);
	return {
		end: text.length,
		start,
		type: "Style"
	}
};

const end_element_name_regex$1 = /[ >]/;
const slash_regex$1 = /^\/|\/$/;
const stop_element_regex$1 = /[^\s/]/;

/**
 * @param {string} text
 * @param {import("../../../public.js").AstSyntaxError[]} errors
 * @param {number} start
 * @returns {import("../../../public.js").Element}
 */
var parse_element$1 = (text, errors, start) => {
	const name_index = text.slice(start + 1).search(end_element_name_regex$1) + 1;
	if (name_index > 0) {
		let child_pre_index = start + name_index;
		const name = text.slice(start + 1, child_pre_index).replace(slash_regex$1, "");
		if (text[child_pre_index] == ">") {
			/** @type {import("../../../public.js").Element} */
			const node = {
				attributes: [],
				children: [],
				end: child_pre_index + 1,
				name,
				start,
				subType: text[start + 1] == "/"
					? "close"
					: text[child_pre_index - 1] == "/"
						? "closed"
						: "open",
				type: "Element"
			};
			if (node?.type == "Element") {
				if (node.name == "script" && node.subType == "open") {
					const text_content = parse_script_content(text, errors, child_pre_index + 1);
					node.children.push(text_content);
					node.end = text_content.end + 9;
				} else if (node.name == "style" && node.subType == "open") {
					const text_content = parse_style_content(text, errors, child_pre_index + 1);
					node.children.push(text_content);
					node.end = text_content.end + 8;
				}
			}
			return node
		}
		/** @type {import("../../../public.js").Attribute[]} */
		const attributes = [];
		for (;;) {
			const child_index = text.slice(child_pre_index).search(stop_element_regex$1);
			if (child_index >= 0) {
				const index = child_pre_index + child_index;
				if (text[index] == ">") {
					/** @type {import("../../../public.js").Element} */
					const node = {
						attributes,
						children: [],
						end: index + 1,
						name,
						start,
						subType: text[start + 1] == "/"
							? "close"
							: text[index - 1] == "/"
								? "closed"
								: "open",
						type: "Element"
					};
					if (node?.type == "Element") {
						if (node.name == "script" && node.subType == "open") {
							const text_content = parse_script_content(text, errors, index + 1);
							node.children.push(text_content);
							node.end = text_content.end + 9;
						} else if (node.name == "style" && node.subType == "open") {
							const text_content = parse_style_content(text, errors, index + 1);
							node.children.push(text_content);
							node.end = text_content.end + 8;
						}
					}
					return node
				}
				const node = parse_attribute$1(text, errors, index);
				attributes.push(node);
				child_pre_index = node.end;
			} else {
				errors.push(
					AstSyntaxError(
						"parse_element is incomplete.",
						start,
						text.length
					)
				);
				return {
					attributes,
					children: [],
					end: text.length,
					name,
					start,
					subType: "open",
					type: "Element"
				}
			}
		}
	}
	errors.push(
		AstSyntaxError(
			"parse_element is incomplete.",
			start,
			text.length
		)
	);
	return {
		attributes: [],
		children: [],
		end: text.length,
		name: text.slice(start),
		start: start,
		subType: "open",
		type: "Element"
	}
};

const stop_text_regex = /[<{]/;

/**
 * @param {string} text
 * @param {import("../../public.js").AstNode} node
 */
const set_text$1 = (text, node) => {
	node.text = text.slice(node.start, node.end);
	if (node.type == "Attribute") {
		if (node.value !== true) {
			set_text$1(text, node.value);
		}
	} else if (node.type == "Element") {
		for (const attr of node.attributes) {
			set_text$1(text, attr);
		}
		for (const child of node.children) {
			set_text$1(text, child);
		}
	} else if (node.type == "Script") {
		for (const string of node.strings) {
			set_text$1(text, string);
		}
	} else if (node.type == "String") {
		for (const script of node.scripts) {
			set_text$1(text, script);
		}
	}
};

/**
 * @param {string} text
 * @param {true=} include_text
 * @returns {{
 *   ast: import("../../public.js").AstNode[]
 *   errors: import("../../public.js").AstSyntaxError[]
 * }}
 */
var index$1 = (text, include_text) => {
	/** @type {import("../../public.js").AstSyntaxError[]} */
	const errors = [];
	/** @type {import("../../public.js").AstNode[]} */
	const ast_nodes = [];
	let start = 0;
	for (;;) {
		const index = text.slice(start).search(stop_text_regex);
		if (index >= 0) {
			if (index) {
				ast_nodes.push(
					{
						end: start + index,
						start,
						type: "Text"
					}
				);
			}
			if (text[start + index] == "<") {
				const node = parse_element$1(text, errors, start + index);
				ast_nodes.push(node);
				start = node.end;
			} else {
				const node = parse_script_block$1(text, errors, start + index);
				ast_nodes.push(node);
				start = node.end;
			}
		} else {
			if (start < text.length) {
				ast_nodes.push(
					{
						end: text.length,
						start,
						type: "Text"
					}
				);
			}
			break
		}
	}
	ast_nodes.sort(
		(a, b) => a.start != b.start
			? a.start - b.start
			: a.end - b.end
	);
	normalize_nodes(text, ast_nodes, errors);
	if (include_text) {
		for (const node of ast_nodes) {
			set_text$1(text, node);
		}
	}
	return { ast: ast_nodes, errors }
};

const end_double_quotes_regex = /(?<=(?<!\\)(?:\\\\)*)"/;

/**
 * @param {string} text
 * @param {import("../../../public.js").AstSyntaxError[]} errors
 * @param {number} start
 * @returns {import("../../../public.js").String & { subType: "double" }}
 */
var parse_script_double_quotes = (text, errors, start) => {
	const index = text.slice(start + 1).search(end_double_quotes_regex) + 1;
	if (index > 0) {
		return {
			end: start + index + 1,
			scripts: [],
			start,
			subType: "double",
			type: "String"
		}
	}
	errors.push(
		AstSyntaxError(
			"parse_script_double_quotes is incomplete.",
			start,
			text.length
		)
	);
	return {
		end: text.length,
		scripts: [],
		start,
		subType: "double",
		type: "String"
	}
};

const end_single_quotes_regex = /(?<=(?<!\\)(?:\\\\)*)'/;

/**
 * @param {string} text
 * @param {import("../../../public.js").AstSyntaxError[]} errors
 * @param {number} start
 * @returns {import("../../../public.js").String & { subType: "single" }}
 */
var parse_script_single_quotes = (text, errors, start) => {
	const index = text.slice(start + 1).search(end_single_quotes_regex) + 1;
	if (index > 0) {
		return {
			end: start + index + 1,
			scripts: [],
			start,
			subType: "single",
			type: "String"
		}
	}
	errors.push(
		AstSyntaxError(
			"parse_script_single_quotes is incomplete.",
			start,
			text.length
		)
	);
	return {
		end: text.length,
		scripts: [],
		start,
		subType: "single",
		type: "String"
	}
};

const stop_script_block_regex$1 = /[{}'"`]/;
/**
 * @param {string} text
 * @param {import("../../../public.js").AstSyntaxError[]} errors
 * @param {number} start
 * @returns {import("../../../public.js").Script & { subType: "template" }}
 */
var parse_script_template = (text, errors, start) => {
	let child_pre_index = start + 2;
	/** @type {import("../../../public.js").String[]} */
	const strings = [];
	for (;;) {
		const child_index = text.slice(child_pre_index).search(stop_script_block_regex$1);
		if (child_index >= 0) {
			const index = child_pre_index + child_index;
			if (text[index] == "}") {
				return {
					end: index + 1,
					start,
					strings,
					subType: "template",
					type: "Script"
				}
			}
			if (text[index] == "{") {
				const node = parse_script_block(text, errors, index);
				for (const str of node.strings) {
					strings.push(str);
				}
				child_pre_index = node.end;
			} else if (text[index] == "'") {
				const node = parse_script_single_quotes(text, errors, index);
				strings.push(node);
				child_pre_index = node.end;
			} else if (text[index] == "\"") {
				const node = parse_script_double_quotes(text, errors, index);
				strings.push(node);
				child_pre_index = node.end;
			} else {
				const node = parse_script_backticks(text, errors, index);
				strings.push(node);
				child_pre_index = node.end;
			}
		} else {
			errors.push(
				AstSyntaxError(
					"parse_script_template is incomplete.",
					start,
					text.length
				)
			);
			return {
				end: text.length,
				start,
				strings,
				subType: "template",
				type: "Script"
			}
		}
	}
};

const stop_backtick_regex = /(?<=(?<!\\)(?:\\\\)*)(?:`|\${)/;

/**
 * @param {string} text
 * @param {import("../../../public.js").AstSyntaxError[]} errors
 * @param {number} start
 * @returns {import("../../../public.js").String & { subType: "backtick" }}
 */
var parse_script_backticks = (text, errors, start) => {
	let child_pre_index = start + 1;
	/** @type {import("../../../public.js").Script[]} */
	const scripts = [];
	for (;;) {
		const child_index = text.slice(child_pre_index).search(stop_backtick_regex);
		if (child_index >= 0) {
			const index = child_pre_index + child_index;
			if (text[index] == "`") {
				return {
					end: index + 1,
					scripts,
					start,
					subType: "backtick",
					type: "String"
				}
			}
			const node = parse_script_template(text, errors, index);
			scripts.push(node);
			child_pre_index = node.end;
		} else {
			errors.push(
				AstSyntaxError(
					"parse_script_backticks is incomplete.",
					start,
					text.length
				)
			);
			return {
				end: text.length,
				scripts,
				start,
				subType: "backtick",
				type: "String"
			}
		}
	}
};

const stop_script_block_regex = /[{}'"`]|<[A-Za-z]/;

/**
 * @param {string} text
 * @param {import("../../../public.js").AstSyntaxError[]} errors
 * @param {number} start
 * @returns {import("../../../public.js").Script & { subType: "jsx" }}
 */
const parse_script_block = (text, errors, start) => {
	let child_pre_index = start + 1;
	/** @type {import("../../../public.js").Element[]} */
	const elements = [];
	/** @type {import("../../../public.js").String[]} */
	const strings = [];
	for (;;) {
		const child_index = text.slice(child_pre_index).search(stop_script_block_regex);
		if (child_index >= 0) {
			const index = child_pre_index + child_index;
			if (text[index] == "}") {
				return {
					elements,
					end: index + 1,
					start,
					strings,
					subType: "jsx",
					type: "Script"
				}
			} else if (text[index] == "<") {
				const node = parse_element(text, errors, index);
				elements.push(node);
				child_pre_index = node.end;
			} else if (text[index] == "{") {
				const node = parse_script_block(text, errors, index);
				for (const str of node.strings) {
					strings.push(str);
				}
				child_pre_index = node.end;
			} else if (text[index] == "'") {
				const node = parse_script_single_quotes(text, errors, index);
				strings.push(node);
				child_pre_index = node.end;
			} else if (text[index] == "\"") {
				const node = parse_script_double_quotes(text, errors, index);
				strings.push(node);
				child_pre_index = node.end;
			} else {
				const node = parse_script_backticks(text, errors, index);
				strings.push(node);
				child_pre_index = node.end;
			}
		} else {
			errors.push(
				AstSyntaxError(
					"parse_script_block is incomplete.",
					start,
					text.length
				)
			);
			return {
				elements,
				end: text.length,
				start,
				strings,
				subType: "jsx",
				type: "Script"
			}
		}
	}
};

const stop_attribute_single_quotes_regex$1 = /(?<=(?<!\\)(?:\\\\)*)["{]/;

/**
 * @param {string} text
 * @param {import("../../../public.js").AstSyntaxError[]} errors
 * @param {number} start
 * @returns {import("../../../public.js").String & { subType: "double" }}
 */
var parse_attribute_double_quotes = (text, errors, start) => {
	let child_pre_index = start + 1;
	/** @type {import("../../../public.js").Script[]} */
	const scripts = [];
	for (;;) {
		const child_index = text.slice(child_pre_index).search(
			stop_attribute_single_quotes_regex$1
		);
		if (child_index >= 0) {
			const index = child_pre_index + child_index;
			if (text[index] == "\"") {
				return {
					end: index + 1,
					scripts,
					start,
					subType: "double",
					type: "String"
				}
			}
			const node = parse_script_block(text, errors, index);
			scripts.push(node);
			child_pre_index = node.end;
		} else {
			errors.push(
				AstSyntaxError(
					"parse_attribute_double_quotes is incomplete.",
					start,
					text.length
				)
			);
			return {
				end: text.length,
				scripts,
				start,
				subType: "double",
				type: "String"
			}
		}
	}
};

const stop_attribute_single_quotes_regex = /(?<=(?<!\\)(?:\\\\)*)(?:'|{)/;

/**
 * @param {string} text
 * @param {import("../../../public.js").AstSyntaxError[]} errors
 * @param {number} start
 * @returns {import("../../../public.js").String & { subType: "single" }}
 */
var parse_attribute_single_quotes = (text, errors, start) => {
	let child_pre_index = start + 1;
	/** @type {import("../../../public.js").Script[]} */
	const scripts = [];
	for (;;) {
		const child_index = text.slice(child_pre_index).search(
			stop_attribute_single_quotes_regex
		);
		if (child_index >= 0) {
			const index = child_pre_index + child_index;
			if (text[index] == "'") {
				return {
					end: index + 1,
					scripts,
					start,
					subType: "single",
					type: "String"
				}
			}
			const node = parse_script_block(text, errors, index);
			scripts.push(node);
			child_pre_index = node.end;
		} else {
			errors.push(
				AstSyntaxError(
					"parse_attribute_single_quotes is incomplete.",
					start,
					text.length
				)
			);
			return {
				end: text.length,
				scripts,
				start,
				subType: "single",
				type: "String"
			}
		}
	}
};

const stop_attribute_name_regex = /[ =>]/;
const stop_space_regex = /\S/;

/**
 * @param {string} text
 * @param {import("../../../public.js").AstSyntaxError[]} errors
 * @param {number} start
 * @returns {import("../../../public.js").Attribute}
 */
var parse_attribute = (text, errors, start) => {
	if (text[start] == "{") {
		const node = parse_script_block(text, errors, start);
		return {
			end: node.end,
			name: "",
			start,
			type: "Attribute",
			value: node
		}
	}
	const name_index = text.slice(start + 1).search(stop_attribute_name_regex) + 1;
	if (name_index > 0) {
		const name = text.slice(start, start + name_index);
		/** @type {import("../../../public.js").Attribute} */
		const node = {
			end: start + name_index,
			name,
			start,
			type: "Attribute",
			value: true
		};
		const equals_sign_index = text.slice(start + name_index).search(stop_space_regex);
		if (equals_sign_index < 0 || text[start + name_index + equals_sign_index] != "=") return node
		const value_index = text.slice(
			start + name_index + equals_sign_index + 1
		).search(stop_space_regex) + 1;
		if (value_index > 0) {
			const index = start + name_index + equals_sign_index + value_index;
			if (text[index] == "'") {
				const value = parse_attribute_single_quotes(text, errors, index);
				node.value = value;
				node.end = value.end;
			} else if (text[index] == "\"") {
				const value = parse_attribute_double_quotes(text, errors, index);
				node.value = value;
				node.end = value.end;
			} else if (text[index] == "{") {
				const value = parse_script_block(text, errors, index);
				node.value = value;
				node.end = value.end;
			} else {
				errors.push(
					AstSyntaxError(
						`parse_attribute value is not valid with "${text[index]}"`,
						start,
						index
					)
				);
				node.end = index;
			}
		} else {
			errors.push(
				AstSyntaxError(
					"parse_attribute value is incomplete.",
					start,
					text.length
				)
			);
			node.end = text.length;
		}
		return node
	}
	errors.push(
		AstSyntaxError(
			"parse_attribute name is incomplete.",
			start,
			text.length
		)
	);
	return {
		end: text.length,
		name: text.slice(start),
		start: start,
		type: "Attribute",
		value: true
	}
};

const end_element_name_regex = /[ >]/;
const slash_regex = /^\/|\/$/;
const stop_element_content_regex = /[{<]/;
const stop_element_regex = /[^\s/]/;

/**
 * @param {string} text
 * @param {import("../../../public.js").AstSyntaxError[]} errors
 * @param {number} start
 * @returns {import("../../../public.js").Element}
 */
const parse_open_tag = (text, errors, start) => {
	const name_index = text.slice(start + 1).search(end_element_name_regex) + 1;
	if (name_index > 0) {
		let child_pre_index = start + name_index;
		const name = text.slice(start + 1, child_pre_index).replace(slash_regex, "");
		if (text[child_pre_index] == ">") {
			/** @type {import("../../../public.js").Element} */
			const node = {
				attributes: [],
				children: [],
				end: child_pre_index + 1,
				name,
				start,
				subType: text[start + 1] == "/"
					? "close"
					: text[child_pre_index - 1] == "/"
						? "closed"
						: "open",
				type: "Element"
			};
			return node
		}
		/** @type {import("../../../public.js").Attribute[]} */
		const attributes = [];
		for (;;) {
			const child_index = text.slice(child_pre_index).search(stop_element_regex);
			if (child_index >= 0) {
				const index = child_pre_index + child_index;
				if (text[index] == ">") {
					/** @type {import("../../../public.js").Element} */
					const node = {
						attributes,
						children: [],
						end: index + 1,
						name,
						start,
						subType: text[start + 1] == "/"
							? "close"
							: text[index - 1] == "/"
								? "closed"
								: "open",
						type: "Element"
					};
					return node
				}
				const node = parse_attribute(text, errors, index);
				attributes.push(node);
				child_pre_index = node.end;
			} else {
				errors.push(
					AstSyntaxError(
						"parse_element is incomplete.",
						start,
						text.length
					)
				);
				return {
					attributes,
					children: [],
					end: text.length,
					name,
					start,
					subType: "open",
					type: "Element"
				}
			}
		}
	}
	errors.push(
		AstSyntaxError(
			"parse_element is incomplete.",
			start,
			text.length
		)
	);
	return {
		attributes: [],
		children: [],
		end: text.length,
		name: text.slice(start),
		start: start,
		subType: "open",
		type: "Element"
	}
};

/**
 * @param {string} text
 * @param {import("../../../public.js").AstSyntaxError[]} errors
 * @param {number} start
 * @returns {import("../../../public.js").Element}
 */
const parse_element = (text, errors, start) => {
	const err = errors.length;
	const node = parse_open_tag(text, errors, start);
	if (errors.length > err || node.subType == "closed") return node
	if (node.subType == "close") {
		errors.push(
			AstSyntaxError(
				`unopened Element "${node.name}" cannot be closed.`,
				node.start,
				node.end
			)
		);
		return node
	}
	let child_pre_index = node.end;
	for (;;) {
		const child_index = text.slice(child_pre_index).search(stop_element_content_regex);
		if (child_index >= 0) {
			const index = child_pre_index + child_index;
			if (child_index) {
				node.children.push(
					{
						end: index,
						start: child_pre_index,
						type: "Text"
					}
				);
			}
			if (text[index] == "<") {
				if (text[index + 1] == "/") {
					if (text.slice(
						index,
						index + node.name.length + 3
					) == `</${node.name}>`) {
						node.end = index + node.name.length + 3;
					} else {
						errors.push(
							AstSyntaxError(
								`close tag is different from open tag "${node.name}".`,
								start,
								text.length
							)
						);
						node.end = text.length;
					}
					return node
				} else {
					const child = parse_element(text, errors, index);
					node.children.push(child);
					child_pre_index = child.end;
				}
			} else {
				const child = parse_script_block(text, errors, index);
				node.children.push(child);
				child_pre_index = child.end;
			}
		} else {
			errors.push(
				AstSyntaxError(
					"parse_element is incomplete.",
					start,
					text.length
				)
			);
			node.end = text.length;
			return node
		}
	}
};

const stop_jsx_regex = /['"`]|<[A-Za-z]/;

/** @typedef {import("../../public.js").AstNode} */

/**
 * @param {string} text
 * @param {import("../../public.js").AstNode} node
 */
const set_text = (text, node) => {
	node.text = text.slice(node.start, node.end);
	if (node.type == "Attribute") {
		if (node.value !== true) {
			set_text(text, node.value);
		}
	} else if (node.type == "Element") {
		for (const attr of node.attributes) {
			set_text(text, attr);
		}
		for (const child of node.children) {
			set_text(text, child);
		}
	} else if (node.type == "Script") {
		for (const string of node.strings) {
			set_text(text, string);
		}
		if (node.subType == "jsx") {
			for (const element of node.elements) {
				set_text(text, element);
			}
		}
	} else if (node.type == "String") {
		for (const script of node.scripts) {
			set_text(text, script);
		}
	}
};

/**
 * @param {string} text
 * @param {true=} include_text
 * @returns {{
 *   ast: import("../../public.js").AstNode[]
 *   errors: import("../../public.js").AstSyntaxError[]
 * }}
 */
var index = (text, include_text) => {
	/** @type {import("../../public.js").AstSyntaxError[]} */
	const errors = [];
	/** @type {import("../../public.js").AstNode[]} */
	const ast_nodes = [];
	let start = 0;
	for (;;) {
		const index = text.slice(start).search(stop_jsx_regex);
		if (index >= 0) {
			if (text[start + index] == "<") {
				const node = parse_element(text, errors, start + index);
				ast_nodes.push(node);
				start = node.end;
			} else if (text[start + index] == "'") {
				const node = parse_script_single_quotes(text, errors, start + index);
				start = node.end;
			} else if (text[start + index] == "\"") {
				const node = parse_script_double_quotes(text, errors, start + index);
				start = node.end;
			} else {
				const node = parse_script_backticks(text, errors, start + index);
				start = node.end;
			}
		} else break
	}
	ast_nodes.sort(
		(a, b) => a.start != b.start
			? a.start - b.start
			: a.end - b.end
	);
	if (include_text) {
		for (const node of ast_nodes) {
			set_text(text, node);
		}
	}
	return { ast: ast_nodes, errors }
};

exports.AstSyntaxError = AstSyntaxError;
exports.parseHtml = index$1;
exports.parseJsx = index;
