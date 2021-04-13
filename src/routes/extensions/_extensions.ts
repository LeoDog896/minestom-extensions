import * as octo from "@octokit/graphql";
import { config } from "dotenv";
import type { Extension } from './_extensionTypes'
import { ExtensionType, Release, ReleaseFile } from './_extensionTypes'

const enviornment = config()

interface RawQueryData {
	search: {
		edges: {
			[index: number]: RawExtension
			map<T>(transform: (RawExtension) => T): T[]
		}
	}

}

interface RawExtension {
	node: {
		description: string
		name: string
		stargazerCount: number
		owner: { 
			login: string
		}
		releases: {
			edges: {
				map<T>(transform: (RawExtension) => T): T[]
				[index: number]: RawRelease
			}
		}
	}
}

interface RawRelease {
	node: {
		name: string
		isPrelease: boolean
		description: string
		tag: {
			name: string
		}
		releaseAssets: {
			edges: {
				map<T>(transform: (RawReleaseFile) => T): T[]
				[index: number]: RawReleaseFile
			}
		}
	}
}

interface RawReleaseFile {
	node: {
		downloadUrl: string
		name: string
		size: number
	}
}

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
				  isPrerelease
				  description
				  tag {
					  name
				  }
				  releaseAssets(first: 10) {
					edges {
					  node {
						downloadUrl
						name
						size
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
async function getGithubInformation(topic: string, amount = 50): Promise<RawQueryData> {

	// Clamp the amount to hardcoded 1 to 50.
	amount = Math.min(Math.max(amount, 1), 50);

	try {
		const data = await octo.graphql(
			query.replace("{type}", topic).replace("{amount}", amount.toString()),
			{
				headers: {
					authorization: `token ${enviornment.parsed.GITHUB}`,
				}
			}
		)

		return data as RawQueryData;

	} catch (error) {
		console.log(error)
		return null;
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
		if ((cache && cache.length != 0) && Date.now() - time < 1000 * 60 * 2) return cache

		// Gets the github information from a GraphQL API
		const data = await getGithubInformation(topic, amount);

		if (data == null) return;
		
		// Maps all the data to the slimmer interface.
		const processedData = data.search.edges
			.map(item => item.node as RawExtension["node"])
			.map((item): Extension => {
				return {
					name: item.name,
					slug: item.owner.login + "_" + item.name,
					description: item.description,
					type,
					repo: `https://github.com/${item.owner.login}/${item.name}`,
					stars: item.stargazerCount,
					owner: item.owner.login,
					releases: item.releases.edges
						.map(release => release.node as RawRelease["node"])
						.map((item): Release => {
							return {
								name: item.name,
								description: item.description,
								prelease: item.isPrelease,
								files: item.releaseAssets.edges
									.map(item => item.node as RawReleaseFile["node"])
									.map((item): ReleaseFile => {
										return {
											url: item.downloadUrl,
											name: item.name,
											size: item.size
										}
									})
							}
						})
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
export async function getExtensions(): Promise<Extension[]> {
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

/**
 * Finds an extension by its slug
 * 
 * @param slug The slug of the extension, formatted as (org)_(repo)
 */
export async function findExtension(slug: string): Promise<Extension> {
	const extensions = await getExtensions();

	const possibleExtensions = extensions.filter(extension => extension.slug == slug)

	if (possibleExtensions.length === 0) return null;

	return possibleExtensions[0]
}