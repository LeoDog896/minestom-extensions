<script context="module" lang="ts">

	import type { Extension } from "./_extensionTypes"

	export async function load({ page, fetch }) {

		const extensionResponse = await fetch(`/extensions/${page.params.slug}.json`);

		if (!extensionResponse.ok) {
			return {
				status: extensionResponse.status,
				error: new Error("Invalid Extension")
			}
		}

		const extension = (await extensionResponse.json()).extension as Extension;

		const readmeResponse = await fetch(`https://api.github.com/repos/${extension.owner}/${extension.name}/contents/README.md`, {
			headers: {
				'Accept': 'application/vnd.github.v3.html'
			}
		})

		if (!readmeResponse.ok) {
			return { 
				status: readmeResponse.status,
				error: new Error("Invalid README")
			}
		}

		return {
			props: { 
				extension,
				readme: await readmeResponse.text()
			}
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
	<title>{extension.name || "Unknown"}</title>
</svelte:head>

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
