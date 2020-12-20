<script context="module" lang="ts">
	import type { Extension } from './_extensions';
	export function preload() {
		return this.fetch(`extensions.json`)
		.then((r: { json: () => any; }) => r.json())
		.then((extension: Extension[]) => {
			return { extension };
		});
	}
</script>

<svelte:head>
	<title>Extensions</title>
</svelte:head>

<script lang="ts">
	export let extensions: Extension[];
</script>

{#each extensions as extension}
	<p>{extension.name}</p>
{/each}