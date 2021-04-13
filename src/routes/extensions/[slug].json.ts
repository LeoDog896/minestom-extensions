import { findExtension } from './_extensions';
import type { Extension } from './_extensionTypes';

export async function get({ params }: { params : { slug: string }}): Promise<{ body: { extension: Extension } }>{
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { slug } = params;
	
	if (await findExtension(slug) != null) {
		return { 
			body: { 
				extension: await findExtension(slug)
			}
		}
	}
}
