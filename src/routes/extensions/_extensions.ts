interface Extension {
	name: String
	slug: String
	type: ExtensionType
	short_description: String
	description: String
}

enum ExtensionType {
	SERVER = "SERVER",
	EXTENSION = "EXTENSION"
}

const extensions: Extension[] = [
	{
		name: "Sabre",
		slug: "sabre",
		type: ExtensionType.SERVER,
		short_description: "A kotlin-based server jar for Minestom",
		description: "A kotlin-based server jar for Minestom"
	},
	{
		name: "RocketTools",
		slug: "rocket-tools",
		type: ExtensionType.EXTENSION,
		short_description: "Extension Manager for Minestom",
		description: "Extension Manager for Minestom"
	}

]

export { extensions }
export type { Extension }
