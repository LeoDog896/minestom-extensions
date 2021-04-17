
<script lang="ts">
	import { page } from '$app/stores'
	import Nav from '$lib/Nav.svelte';
	import '../app.scss';
</script>

<style>

	:global(body) {
		background: var(--bg-gradient);
	}
	main {
		position: relative;
		max-width: 56em;
		background-color: rgba(0,0,0,0);
		color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<Nav segment={$page.path}/>

<main>
	<slot></slot>
</main>