import fetch from 'node-fetch';

interface Extension {
	name: string
	slug: string
	type: ExtensionType
	short_description: string
	description: string
	repo: string
	owner: string
	stars: number
}

/**
 * Gets all extensions from a specific topic and maps them to a type.
 * 
 * @param topic The topic to get the list of extensions from.
 * @param type The type of extension this is.
 * 
 * @return A promise containing a list of extensions on that topic. Empty array if none are found.
 */
async function getExtensionsTopic(topic: String, type: ExtensionType): Promise<Extension[]> {
	// TODO apparantely github has a GraphQL API. Less bandwidth = more fun!
	const response = await fetch(`https://api.github.com/search/repositories?q=topic%3Aminestom-${topic}`);
	const data = await response.json();

	if (data == null || data["items"] == null) {
		// Log error to console
		// TODO use winston or some js logger
		console.error("Api request error: " + "\r\n" + response.message);
		
		return [] // Stops the page from crashing accidentally.
	}
	return data["items"].map((entry): Extension => {
		return {
			name: entry.name,
			slug: entry.full_name.replace("/", "-").toLowerCase(),
			short_description: entry.description,
			description: entry.description,
			type,
			repo: entry.html_url,
			stars: entry.stargazers_count,
			owner: entry.owner.login
		}
	})
}

async function getExtensions(): Promise<Extension[]> {
	return Promise.all([
		getExtensionsTopic("extension", ExtensionType.EXTENSION),
		getExtensionsTopic("library", ExtensionType.LIBRARY),
		getExtensionsTopic("server", ExtensionType.SERVER),
	])
	.then(extensions => [].concat(...extensions))
	.then(extensions => extensions.sort((extensionA, extensionB) => extensionB.stars - extensionA.stars));
}

enum ExtensionType {
	SERVER = "SERVER",
	EXTENSION = "EXTENSION",
	LIBRARY = "LIBRARY"
}

export { getExtensions }
export type { Extension }
