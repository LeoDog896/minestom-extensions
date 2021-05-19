<script lang="ts" context="module">
	export async function load({ page, fetch }) {

		const extensionResponse = await fetch(`/extensions/${page.params.slug}.json`);

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
<script lang="ts">

	import type { Extension } from "./_extensionTypes"
	import marked from 'marked';

	export let extension: Extension
	export let readme: String
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
</style>

<svelte:head>
	<title>"Unknown"</title>
</svelte:head>

<h1>{extension.name || "Unknown"}</h1>
<h3>{extension.description || ""}</h3>
<br />

{#if extension.releases.length > 0}
	<a href="{extension.releases[0].files[0].url || (extension.repo + "/releases")}">{extension.releases[0].name}</a>
{/if}
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