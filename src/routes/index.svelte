<script context="module">
	export const prerender = true;
</script>
<style>
	p {
		text-align: center;
		margin: 1em auto;
		font-size: 1.5rem;
	}
	h1 {
		font-size: 7rem;
		font-family: 'Manrope', sans-serif;
		text-decoration: bold;
		font-weight: 800;
		margin: 0.2em;
		background: var(--bg-gradient);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent; 
	}
	h2 {
		text-align: center;
		margin: 0 auto;
		font-size: 2em;
	}
	.header {
		text-align: center;
	}
</style>

<svelte:head>
	<title>Minestom</title>
</svelte:head>

<div class="header">
	<h1>Fast.</h1>
	<h1>Simple.</h1>
	<h1>Dynamic.</h1>
</div>

<p>Minestom is the next generation of Minecraft: Java Edition servers.</p>
<br /><br />
<h2>Adding an extension</h2>

<p>Add your extension by adding the topic minestom-server, minestom-library, or minestom-extension. The changes should take around 2 minutes to apply.</p>