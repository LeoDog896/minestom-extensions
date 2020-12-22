interface Extension {
	name: string
	slug: string
	type: ExtensionType
	short_description: string
	description: string
	repo: string
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
		description: "A kotlin-based server jar for Minestom",
		repo: "https://github.com/Project-Cepi/Sabre"
	},
	{
		name: "RocketTools",
		slug: "rocket-tools",
		type: ExtensionType.EXTENSION,
		short_description: "Extension Manager for Minestom",
		description: "Extension Manager for Minestom",
		repo: "https://github.com/Project-Cepi/RocketTools"
	},
	{
		name: "ExampleExtension",
		slug: "example-extension",
		type: ExtensionType.EXTENSION,
		short_description: "Example Extension built on top of kotlin",
		description: "Example Extension built on top of kotlin",
		repo: "https://github.com/Project-Cepi/ExampleExtension"
	}

]

export { extensions }
export type { Extension }
