type Flow = {
	add: (pathname: string, handler: HandlerFunction) => Flow
	begin: () => {
		data: () => Record<string, any>
		step: (data: Record<string, any>) => void
	}
}
declare module "wizard-lube" {
	const flow: (base?: string) => Flow
}