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
	},
	{
		name: "MineSchem",
		slug: "mine-schem",
		type: ExtensionType.EXTENSION,
		short_description: "A Schematic manager for Minestom",
		description: "Add schematic support for minestom",
		repo: "https://github.com/sejtam10/MineSchem"
	},
	{
		name: "MinestomWorldEdit",
		slug: "worldedit",
		type: ExtensionType.EXTENSION,
		short_description: "A WorldEdit port for Minestom",
		description: "A WorldEdit port for Minestom",
		repo: "https://github.com/OpenMinigameServer/MinestomWorldEdit"
	},
	{

		name: "LuaMinestom",
		slug: "lua",
		type: ExtensionType.EXTENSION,
		short_description: "Lua platform intergrated into Minestom",
		description: "Lua platform intergrated into Minestom",
		repo: "https://github.com/KrystilizeNevaDies/LuaMinestom"
	},
	{
		name: "Orbis",
		slug: "orbis",
		type: ExtensionType.EXTENSION,
		short_description: "A native world generator for Minestom",
		description: "A native world generator for Minestom",
		repo: "https://github.com/AzortisCode/Orbis"
	}

]

export { extensions }
export type { Extension }
