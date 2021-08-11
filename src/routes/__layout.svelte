
<script lang="ts">
	import { page } from '$app/stores'
	import Nav from '$lib/Nav.svelte';
	import '../app.scss';
</script>

<style>

	:global(body) {
		background: var(--background);
	}
</style>

<Nav segment={$page.path}/>

<slot></slot>