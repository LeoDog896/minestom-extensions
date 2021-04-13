enum ExtensionType {
	SERVER = "SERVER",
	EXTENSION = "EXTENSION",
	LIBRARY = "LIBRARY"
}

interface Extension {
	name: string
	slug: string
	type: ExtensionType
	description: string
	repo: string
	owner: string
	stars: number
	releases: Release[]
}

interface Release {
	url: string,
	name: string
}

export type { Extension }
export { ExtensionType }
