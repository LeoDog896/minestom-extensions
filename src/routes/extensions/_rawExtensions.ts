import * as octo from "@octokit/graphql";
import type { ExtensionType, Extension, Release, ReleaseFile } from './_extensionTypes'

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
			releases(first: 100) {
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
async function getGithubInformation(topic: string, amount = 50, token: string): Promise<RawQueryData> {

	// Clamp the amount to hardcoded 1 to 50.
	amount = Math.min(Math.max(amount, 1), 50);

	try {
		const data = await octo.graphql(
			query.replace("{type}", topic).replace("{amount}", amount.toString()),
			{
				headers: {
					authorization: `token ${token}`,
				}
			}
		)

		return data as RawQueryData;

	} catch (error) {
		console.log(error)
		return null;
	}

}

export async function getGithubData(topic: string, amount = 50, token: string, type: ExtensionType): Promise<Extension[]> {
	const data = await getGithubInformation(topic, amount, token);

	if (data == null) return [];
	
	// Maps all the data to the slimmer interface.
	return data.search.edges
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
}