import { graphql } from "@octokit/graphql";
import dotenv from "dotenv";
dotenv.config()

interface Release { 
	name: string
	url: string
}

interface Extension {
	name: string
	slug: string
	type: ExtensionType
	description: string
	repo: string
	owner: string
	stars: number
}

/**
 * The GraphQL query to get all the necessary data.
 */
const query = `
{
	search(type: REPOSITORY, query: "topic:minestom-{type}", first: 50) {
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

async function getGithubInformation(topic: string): Promise<any[]> { // TODO official typing
	try {
		const data = await graphql(
			query.replace("{type}", topic),
			{
				headers: {
					authorization: `token ${process.env.GITHUB}`,
				},
			})

		return data["search"]["edges"]

	} catch (error) {
		// Log error to console
		// TODO use winston or some js logger
		console.error("Api request error: " + "\r\n" + error.message);

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
function getExtensionsTopic(topic: string, type: ExtensionType): () => Promise<Extension[]> {

	// Time cache. Will refresh data if a request is made after 2 minutes.
	let cache = null
	let time = Date.now()

	return async function () {

		if (cache != undefined && Date.now() - time < 1000 * 60 * 2) return cache

		// Gets the github information from a GraphQL API
		const data = await getGithubInformation(topic);
		
		// Maps all the data to the interface. Slimmer!
		const processedData = data.map((entry): Extension => {
			return {
				name: entry.node.name,
				slug: entry.node.owner.login + "_" + entry.node.name,
				description: entry.node.description,
				type,
				repo: `https://github.com/${entry.node.owner.login}/${entry.node.name}`,
				stars: entry.node.stargazerCount,
				owner: entry.node.owner.login
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
