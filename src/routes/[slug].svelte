<script lang="ts" context="module">

	import Container from '$lib/Container.svelte';

	export async function load({ page, fetch }) {

		const extensionResponse = await fetch(`/${page.params.slug}.json`);

		if (!extensionResponse.ok) {
			return {
				status: extensionResponse.status,
				error: new Error("Invalid Extension")
			}
		}

		const extension = (await extensionResponse.json()).extension as Extension;

		const readmeResponse = await fetch(`https://raw.githubusercontent.com/${extension.owner}/${extension.name}/master/README.md`)

		if (!readmeResponse.ok) {
			return { 
				status: readmeResponse.status,
				error: new Error("Invalid README")
			}
		}

		const readme = marked(await readmeResponse.text())

		return {
			props: {
				readme,
				extension
			}
		}
	}
</script>
<style>
	.content :global(h2) {
		font-size: 1.4em;
		font-weight: 500;
	}

	.content :global(pre) :global(code) {
		background-color: transparent;
		padding: 0;
	}

	.content :global(ul) {
		line-height: 1.5;
	}

	.content :global(li) {
		margin: 0 0 0.5em 0;
	}

	button {
		float: right;
		padding: 5px 10px;
		background: var(--bg-gradient);
		color: white;
		text-decoration: bold;
		border: none;
		border-radius: 5px;
		font-family: 'Manrope', sans-serif;
		font-size: 1.2rem;
	}

</style>

<script lang="ts">

	import type { Extension } from "./_extensionTypes"
	import marked from 'marked';

	export let extension: Extension
	export let readme: String

	const lastRelease = extension.releases[extension.releases.length - 1]

	const minestomReleases = lastRelease.files.filter((release) => release.name.includes("minestom"))
	const shadowJarReleases = lastRelease.files.filter((release) => release.name.includes("-all"))

	let chosenFile = (() => {
		if (minestomReleases.length == 1) 
			return minestomReleases[0]
		else if (shadowJarReleases.length == 1)
			return shadowJarReleases[0]
		else 
			return lastRelease.files[0]
	})()
</script>

<svelte:head>
	<title>"Unknown"</title>
</svelte:head>

<Container>
	{#if extension.releases.length > 0}
		<button>
			<a href="{chosenFile.url
				|| (extension.repo + "/releases")}">{lastRelease.name} (Latest)</a>
		</button>
	{/if}

	<h1>{extension.name || "Unknown"}</h1>
	<h3>{extension.description || ""}</h3>
	<br />

	<div class="content">
		Source code: <a href="{extension.repo || "https://github.com"}">{extension.repo || "Unknown"}</a>
		<hr>
		<br />
		<br />
		<section id="readme">
			{@html readme || "README not found."}
		</section>
		<br>
</div>
</Container>