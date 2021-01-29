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
		color: black;
		background-color: white;
		transition: 100ms;
	}

	.extension:hover {
		color: white;
		background-color: black;
	}

	.extension p {
		margin-bottom: 0px;
	}

	.right {
		text-align: right;
		float: right;
	}
</style>

<script lang="ts">
	export let extensions: Extension[];
</script>

<section id="extensions">
	{#each extensions as extension}
		<div class="extension">
			<a href="extensions/{extension.slug}">{extension.name}</a>
			<a href="{extension.repo}">(github)</a>
			<a href="https://github.com/{extension.owner}">by {extension.owner}</a>
			<span class="right">{extension.stars} Stars</span>
			<p>{extension.short_description}</p>
		</div>
	{/each}
</section>