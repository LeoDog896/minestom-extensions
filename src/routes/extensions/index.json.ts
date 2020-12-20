interface Extension {
	name: String
}

const extensions: Extension[] = [
	
]

const contents = JSON.stringify(extensions.map(post => {
	return {
		title: post.name
	};
}));

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}