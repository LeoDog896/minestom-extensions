import { getExtensions } from './_extensions';
import type { Extension }from './_extensionTypes'

export async function get(): Promise<{ body: { extensions: Extension[] } }> {

	const extensions = await getExtensions()
	
	return { 
		body: {
			extensions
		}
	}

}