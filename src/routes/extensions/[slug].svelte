<script context="module" lang="ts">

	import type { Extension } from "./_extensions"

	export async function preload({ params }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(`extensions/${params.slug}.json`);
		const data = await res.json();

		if (res.status === 200) {
			return { extension: data };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script lang="ts">
	export let extension: Extension;
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
	{extension.description}
</div>
