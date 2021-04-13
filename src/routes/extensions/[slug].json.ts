import { getExtensions } from './_extensions';
import type { Extension } from './_extensionTypes';

const lookup = new Map();
getExtensions().then(data => data.forEach(extension => {
	lookup.set(extension.slug, JSON.stringify(extension));
}));

export async function get({ params }: { params : { slug: string }}): Promise<{ body: { extension: Extension } }>{
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { slug } = params;

	if (lookup.has(slug)) {
		return { 
			body: { 
				extension: JSON.parse(lookup.get(slug))
			}
		}
	}
}
