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

<style>
	.extension {
		margin-bottom: 20px;
		border: 1px solid black;
		padding: 10px;
	}
</style>

<script lang="ts">
	export let extensions: Extension[];
</script>

<section id="extensions">
	{#each extensions as extension}
		<div class="extension">
			<a href="extensions/{extension.slug}">{extension.name}</a>
		<p>{extension.short_description}</p>
		</div>
	{/each}
</section>