import * as octo from "@octokit/graphql";
import {} from "dotenv/config";
import type { Extension } from './_extensionTypes'
import { ExtensionType } from './_extensionTypes'

/**
 * The GraphQL query to get all the necessary data.
 */
const query = `
{
	search(type: REPOSITORY, query: "topic:minestom-{type}", first: {amount}) {
		edges {
			node {
			  ... on Repository {
				description
				name
				stargazerCount
				owner {
				  login
				}
				releases(first: 1) {
				  edges {
					node {
					  name
					  releaseAssets(first: 10) {
						edges {
						  node {
							url
							name
						  }
						}
					  }
					}
				  }
				}
			  }
			}
		  }
		}
	  }
	  
`

// TODO allow cursor indexing
async function getGithubInformation(topic: string, amount = 50): Promise<any[]> { // TODO official typing

	// Clamp the amount to hardcoded 1 to 50.
	amount = Math.min(Math.max(amount, 1), 50);

	try {
		const data = await octo.graphql(
			query.replace("{type}", topic).replace("{amount}", amount.toString()),
			{
				headers: {
					authorization: `token ${process.env.GITHUB}`,
				}
			})

		return data["search"]["edges"]

	} catch (error) {
		return [] // Stops the page from crashing accidentally.
	}

}

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
		if (cache && Date.now() - time < 1000 * 60 * 2) return cache

		// Gets the github information from a GraphQL API
		const data = await getGithubInformation(topic, amount);
		
		// Maps all the data to the interface. Slimmer!
		const processedData = data.map(({ node: { name, owner: { owner }, description, stargazerCount: stars } }): Extension => {
			return {
				name,
				slug: owner + "_" + name,
				description,
				type,
				repo: `https://github.com/${owner}/${name}`,
				stars,
				owner
			}
		})

		// Refreshes the cache.
		cache = processedData
		time = Date.now()

		return processedData
	}
}

/**
 * Gets a list of all the extensions containing all the necessary topics
 * 
 * @return All the extensions
 */
async function getExtensions(): Promise<Extension[]> {
	return Promise.all([
		getExtensionsTopic("extension", ExtensionType.EXTENSION)(),
		getExtensionsTopic("library", ExtensionType.LIBRARY)(),
		getExtensionsTopic("server", ExtensionType.SERVER)(),
	])
		// Flatten the array.
		.then(extensions => [].concat(...extensions))
		// Sorts it from greatest number of stars to smallest number of stars
		.then(extensions => extensions.sort((extensionA, extensionB) => extensionB.stars - extensionA.stars));
}

export { getExtensions }