import { extensions } from './_extensions';

const contents = JSON.stringify(extensions.map(post => {
	return {
		title: post.name,
		type: post.type
	};
}));

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}