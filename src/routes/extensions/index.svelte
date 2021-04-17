<svelte:head>
	<title>Extensions</title>
</svelte:head>

<style lang="scss">
	.extension {
		margin-bottom: 20px;
		border: 1px solid black;
		padding: 10px;
		color: white;
		&:hover {
			color: #eee;
		}
	}

	@keyframes -global-appear {
		from {
			opacity: 0;
			transform: translateX(-50%);
		}

		to {
			opacity: 1;
			transform: translateX(0%);
		}
	}
	
	a {
		text-decoration: none;

		&:hover {
			color: #bbb;
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
	    background-image: linear-gradient(-90deg, rgba(0, 0, 0, 0.2) 50%, transparent 50%);
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

	import type { Extension } from './_extensionTypes';
	import { onMount } from 'svelte';

	let extensions: Extension[];

	onMount(async() => {
		const res = await fetch(`/extensions.json`)

		if (res.ok) {
			extensions = (await res.json()).extensions;
			return;
		}

		extensions = []
	});

	const extensionLoopGenerator = (index) => `animation: appear ${100 * (index + 1)}ms;`

</script>

<section id="extensions">
	{#if Array.isArray(extensions)}
		{#each extensions as extension, i}
			<a href="extensions/{extension.slug}">
				<div class="extension banner" style={extensionLoopGenerator(i)}>
					{extension.name}
					<a href="{extension.repo}">(github)</a>
					<a href="https://github.com/{extension.owner}">by {extension.owner || "unknown"}</a>
					<span class="right stars">{extension.stars || 0} Stars</span>
					<p>{extension.description || "No description provided"}</p>
				</div>
			</a>
		{/each}
	{:else}
		<p>Loading extensions...</p>
	{/if}
</section>