<svelte:head>
	<title>Extensions</title>
</svelte:head>

<style lang="scss">
	.extension {
		margin-bottom: 20px;
		border: 1px solid black;
		padding: 10px;
		color: white;
		&:hover {
			color: #eee;
		}
		font-family: 'Manrope', sans-serif
	}

	@keyframes -global-appear {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}
	
	a {
		text-decoration: none;

		&:hover {
			color: #bbb;
		}
	}
	
	.stars:hover {
		color: #0D5;
	}

	.extension p {
		margin-bottom: 0px;
	}

	.right {
		text-align: right;
		float: right;
	}
	
	/* Dont mind me, just making some fancy css */
	
	.banner {
	    background-image: linear-gradient(-90deg, rgba(0, 0, 0, 0.2) 50%, transparent 50%);
	    background-position: 100%;
	    background-size: 225%;
	    transition: 1000ms cubic-bezier(0.10, 1.0, 0.10, 1.0);

		&:hover {
			background-position: 12.5%;
			background-size: 200%;
		}
	}

	#input-holder {
		display: grid;
		place-items: center;
		margin-bottom: 50px;
		width: 100%;
	}

	input {
		background: transparent;
		color: white;
		font-size: 1.5rem;
		font-family: 'Manrope', sans-serif;
		outline: 0; // TODO accessiblity?
		border: solid 1px transparent;
		text-align: center;
		width: 100%;
	}
</style>
<script lang="ts" context="module">

	import Container from '$lib/Container.svelte';

	export async function load({ fetch }) {
		const res = await fetch(`/index.json`)

		if (!res.ok) {
			return {
				status: 404,
				error: new Error("Extensions not found!")
			}
		}

		return {
			props: {
				extensions: (await res.json()).extensions
			}
		}
	}
</script>
<script lang="ts">

	import type { Extension } from './_extensionTypes';
	import Fuse from 'fuse.js'

	export let extensions: Extension[];

	const fuse = new Fuse(extensions, {
		useExtendedSearch: true,
		keys: [
			"name",
			"description",
			"owner"
		]
	})

	let input = ""

	let displayedExtensions = extensions

	$: {
		const data = fuse.search(input)
		if (data.length === 0 && input == "")
			displayedExtensions = extensions
		else if (data.length === 0 && input != "")
			displayedExtensions = []
		else
			displayedExtensions = data.map(item => item.item)
	}

	const extensionLoopGenerator = (index) => `animation: appear ${100 * (index + 1)}ms;`

</script>

<Container>
	<div id="input-holder">
		<input placeholder="Search for extensions ({extensions.length})..." bind:value={input}>
	</div>
	<section id="extensions">
		{#each displayedExtensions as extension, i}
			<a href="/{extension.slug}">
				<div class="extension banner" style={extensionLoopGenerator(i)}>
					{extension.name}
					<a href="{extension.repo}">(github)</a>
					<a href="https://github.com/{extension.owner}">by {extension.owner || "unknown"}</a>
					<span class="right stars">{extension.stars || 0} Star{extension.stars == 1 ? "" : "s"}</span>
					<p>{extension.description || "No description provided"}</p>
				</div>
			</a>
		{/each}
	</section>
</Container>