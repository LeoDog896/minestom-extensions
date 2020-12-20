<script context="module" lang="ts">
	import type { Extension } from './_extensions';
	export function preload() {
		return this.fetch(`extensions.json`)
		.then((r: { json: () => any; }) => r.json())
		.then((extensions: Extension[]) => {
			return { extensions };
		});
	}
</script>

<svelte:head>
	<title>Extensions</title>
</svelte:head>

<script lang="ts">
	export let extensions: Extension[];
</script>

<section id="photos">
	{#each extensions as extension}
		<a href="extensions/{extension.slug}">{extension.name}</a><br />
	{/each}
</section>