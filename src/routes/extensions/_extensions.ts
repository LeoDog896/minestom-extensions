interface Extension {
	name: String
	type: ExtensionType
}

enum ExtensionType {
	SERVER = "SERVER",
	EXTENSION = "EXTENSION"
}

const extensions: Extension[] = [
	{
		name: "Sabre",
		type: ExtensionType.SERVER,
	}

]

export { extensions }
export type { Extension }
