import { flow } from "wizard-lube"

let myFlow = (flow() || flow("/context"))
	.add("", (data: Record<string, any>) => {})
	.begin()
myFlow.data()
myFlow.step((data: Record<string, any>) => data)