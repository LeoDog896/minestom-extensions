import { getExtensions } from './_extensions';

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	getExtensions().then(content => res.end(JSON.stringify(content)))

}