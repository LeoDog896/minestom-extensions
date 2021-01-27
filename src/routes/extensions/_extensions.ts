import fetch from 'node-fetch';

interface Extension {
	name: string
	slug: string
	type: ExtensionType
	short_description: string
	description: string
	repo: string
}


async function getExtensions(): Promise<Extension[]> {
	const data = await fetch(`https://api.github.com/search/repositories?q=topic%3Athunderstom-extension`).then(response => response.json())
	return data["items"].map((entry): Extension => {
		return {
			name: entry.name,
			slug: entry.full_name.replace("/", "-").toLowerCase(),
			short_description: entry.description,
			description: entry.description,
			type: ExtensionType.EXTENSION,
			repo: entry.html_url
		}
	})
}

enum ExtensionType {
	SERVER = "SERVER",
	EXTENSION = "EXTENSION",
	LIBRARY = "LIBRARY"
}

export { getExtensions }
export type { Extension }
