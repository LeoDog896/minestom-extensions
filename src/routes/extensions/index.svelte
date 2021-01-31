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
	.extension{
		margin-bottom: 20px;
		border: 1px solid black;
		padding: 10px;
		color: black;
	}
	
	a {
		text-decoration: none;
	}

	.extension:hover {
		color: #222;
	}
	
	.stars:hover {
		color: #0D5;
	}

	.extension p {
		margin-bottom: 0px;
	}

	.right {
		text-align: right;
		float: right;
	}
	
	/* Dont mind me, just making some fancy css */
	
	.banner {
	    background-image: -webkit-linear-gradient(-90deg, #DDD 50%, transparent 50%);
	    background-image: linear-gradient(-90deg, #DDD 50%, transparent 50%);
	    background-position: 100%;
	    background-size: 225%;
	    -webkit-transition: 1000ms cubic-bezier(0.10, 1.0, 0.10, 1.0);
	    transition: 1000ms cubic-bezier(0.10, 1.0, 0.10, 1.0);
	}
	
	.banner:hover {
	    background-position: 12.5%;
		background-size: 200%;
	}
	
	a:hover {
		color: #999;
	}
</style>

<script lang="ts">
	export let extensions: Extension[];
</script>

<section id="extensions">
	{#each extensions as extension}
		<a href="extensions/{extension.slug}">
			<div class="extension banner">
				{extension.name}
				<a href="{extension.repo}">(github)</a>
				<a href="https://github.com/{extension.owner}">by {extension.owner}</a>
				<span class="right stars">{extension.stars} Stars</span>
				<p>{extension.description}</p>
			</div>
		</a>
	{/each}
</section>