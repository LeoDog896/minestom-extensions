import fetch from 'node-fetch';
import { graphql } from "@octokit/graphql";
import dotenv from "dotenv";
dotenv.config()

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
	let cache = null
	let time = Date.now()

	return async function () {

		if (cache != undefined && Date.now() - time < 1000 * 60 * 2) return cache

		const data = await getGithubInformation(topic);

		// TODO move to graphql fetch
		// if (data == null || data["items"] == null) {
		// 	// Log error to console
		// 	// TODO use winston or some js logger
		// 	console.error("Api request error: " + "\r\n" + response.message);

		// 	return [] // Stops the page from crashing accidentally.
		// }

		const processedData = data.map((entry): Extension => {
			return {
				name: entry.node.name,
				slug: entry.node.owner.login + "_" + entry.node.name,
				short_description: entry.node.description,
				description: entry.node.description,
				type,
				repo: `https://github.com/${entry.node.owner.login}/${entry.node.name}`,
				stars: entry.node.stargazerCount,
				owner: entry.node.owner.login
			}
		})

		cache = processedData
		time = Date.now()

		return processedData
	}
}

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
