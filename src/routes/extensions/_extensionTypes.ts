enum ExtensionType {
	SERVER = "SERVER",
	EXTENSION = "EXTENSION",
	LIBRARY = "LIBRARY"
}

/**
 * Represents an extension object.
 */
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
	name: string
	description: string
	prelease: boolean
	files: ReleaseFile[]
}

interface ReleaseFile {
	url: string,
	name: string
	size: number
}

export type { Extension, Release, ReleaseFile }
export { ExtensionType }
