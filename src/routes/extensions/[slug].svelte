<script lang="ts">

	import type { Extension } from "./_extensionTypes"
	import { onMount } from 'svelte';
	import { page } from '$app/stores'
	import marked from 'marked';

	let extension: Extension
	let readme: string
	let slug: string

	page.subscribe(value => {
		slug = value.params.slug
	})

	onMount(async () => {

		const extensionResponse = await fetch(`/extensions/${slug}.json`);

		if (!extensionResponse.ok) {
			return {
				status: extensionResponse.status,
				error: new Error("Invalid Extension")
			}
		}

		extension = (await extensionResponse.json()).extension as Extension;

		const readmeResponse = await fetch(`https://raw.githubusercontent.com/${extension.owner}/${extension.name}/master/README.md`)

		if (!readmeResponse.ok) {
			return { 
				status: readmeResponse.status,
				error: new Error("Invalid README")
			}
		}

		readme = marked(await readmeResponse.text())

	});
</script>

<style>
	.content :global(h2) {
		font-size: 1.4em;
		font-weight: 500;
	}

	.content :global(pre) {
		background-color: #f9f9f9;
		box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
		padding: 0.5em;
		border-radius: 2px;
		overflow-x: auto;
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

{#if extension}

	<h1>{extension.name || "Unknown"}</h1>
	<h3>{extension.description || ""}</h3>
	<br />

	<a href="{extension.releases[0].files[0].url || (extension.repo + "/releases")}">{extension.releases[0].name}</a>

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
{:else}
	Loading Extension...
{/if}