<script context="module" lang="ts">
	import type { Extension } from './_extensionTypes';
	export async function load({ fetch }) {
		const res = await fetch(`extensions.json`)

		if (res.ok) {
			return { props: await res.json() };
		}

		return {
			status: res.status,
			error: new Error(`Could not load extensions`)
		};
	}
</script>

<svelte:head>
	<title>Extensions</title>
</svelte:head>

<style lang="scss">
	.extension {
		margin-bottom: 20px;
		border: 1px solid black;
		padding: 10px;
		color: black;

		&:hover {
			color: #222;
		}
	}
	
	a {
		text-decoration: none;

		&:hover {
			color: #999;
		}
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
	    background-image: linear-gradient(-90deg, #DDD 50%, transparent 50%);
	    background-position: 100%;
	    background-size: 225%;
	    transition: 1000ms cubic-bezier(0.10, 1.0, 0.10, 1.0);

		&:hover {
			background-position: 12.5%;
			background-size: 200%;
		}
	}
</style>

<script lang="ts">
	export let extensions: Extension[];
</script>

<section id="extensions">
	{#if Array.isArray(extensions)}
		{#each extensions as extension}
			<a href="extensions/{extension.slug}">
				<div class="extension banner">
					{extension.name}
					<a href="{extension.repo}">(github)</a>
					<a href="https://github.com/{extension.owner}">by {extension.owner || "unknown"}</a>
					<span class="right stars">{extension.stars || 0} Stars</span>
					<p>{extension.description || "No description provided"}</p>
				</div>
			</a>
		{/each}
	{/if}
	{#if !Array.isArray(extensions)}
		<p>An internal error has occurred.</p>
	{/if}
</section>