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
		}

		to {
			opacity: 1;
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
<script lang="ts" context="module">
	export async function load({ page, fetch }) {
		const res = await fetch(`/extensions.json`)

		if (!res.ok) {
			return {
				status: 404,
				error: new Error("Extensions not found!")
			}
		}

		return {
			props: {
				extensions: (await res.json()).extensions
			}
		}
	}
</script>
<script lang="ts">

	import type { Extension } from './_extensionTypes';

	export let extensions: Extension[];

	const extensionLoopGenerator = (index) => `animation: appear ${100 * (index + 1)}ms;`

</script>

<section id="extensions">
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
</section>