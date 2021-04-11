<script context="module" lang="ts">

	import type { Extension } from "./_extensionTypes"

	export async function preload({ params }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const extensionResponse = await this.fetch(`extensions/${params.slug}.json`);
		const extension = await extensionResponse.json();

		const readmeResponse = await this.fetch(`https://api.github.com/repos/${extension.owner}/${extension.name}/contents/README.md`, {
			headers: {
				'Accept': 'application/vnd.github.v3.html'
			}
		})

		const readme = await readmeResponse.text();

		if (extensionResponse.status === 200) {
			return { extension, readme };
		} else {
			this.error(extensionResponse.status, extension.message);
		}
	}
</script>

<script lang="ts">
	export let extension: Extension;
	export let readme: string;
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
	<title>{extension.name}</title>
</svelte:head>

<h1>{extension.name}</h1>

<div class="content">
	Source code: <a href="{extension.repo}">{extension.repo}</a>
	<br />
	<br />
	<section id="readme">
		{@html readme || "README not found."}
	</section>
	<br>
</div>
