import { config } from "dotenv";
import type { Extension } from './_extensionTypes'
import { ExtensionType } from './_extensionTypes'
import { getGithubData } from './_rawExtensions'

const enviornment = config()

/**
 * Gets all extensions from a specific topic and maps them to a type.
 * 
 * @param topic The topic to get the list of extensions from.
 * @param type The type of extension this is.
 * 
 * @return A promise containing a list of extensions on that topic. Empty array if none are found.
 */
function getExtensionsTopic(topic: string, type: ExtensionType, amount = 50): () => Promise<Extension[]> {

	// Time cache. Will refresh data if a request is made after 2 minutes.
	let cache: Extension[] = []
	let time: number = Date.now()

	return async () => {

		// Cache can't be invalid, and 1000 (ms) * 60 (s) * 2 (minutes) before resetting the cache.
		if ((cache && cache.length != 0) && Date.now() - time < 1000 * 60 * 2) return cache

		// Gets the github information from a GraphQL API
		const data = await getGithubData(topic, amount, enviornment.parsed.GITHUB, type);

		// Refreshes the cache.
		cache = data
		time = Date.now()

		return data
	}
}

const getExtensionsTopicExtension = getExtensionsTopic("extension", ExtensionType.EXTENSION)
const getExtensionsTopicLibrary = getExtensionsTopic("library", ExtensionType.LIBRARY)
const getExtensionsTopicServer = getExtensionsTopic("server", ExtensionType.SERVER)

/**
* Gets a list of all the extensions containing all the necessary topics
* 
* @return All the extensions
*/
export async function getExtensions(): Promise<Extension[]> {
	return Promise.all([
		getExtensionsTopicExtension(),
		getExtensionsTopicLibrary(),
		getExtensionsTopicServer()
	])
	   // Flatten the array.
	   .then(extensions => [].concat(...extensions))
	   // Sorts it from greatest number of stars to smallest number of stars
	   .then(extensions => extensions.sort((extensionA, extensionB) => extensionB.stars - extensionA.stars));
}

/**
 * Finds an extension by its slug
 * 
 * @param slug The slug of the extension, formatted as (org)_(repo)
 * 
 * @return An extension object, if any found.
 */
export async function findExtension(slug: string): Promise<Extension> {
	const extensions = await getExtensions();

	const possibleExtensions = extensions.filter(extension => extension.slug == slug)

	if (possibleExtensions.length === 0) return null;

	return possibleExtensions[0]
}