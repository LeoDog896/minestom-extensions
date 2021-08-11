<script context="module">
	export const prerender = true;
</script>
<style>

	main {
		padding-top: 30px;
		background: var(--bg-gradient);
		width: 100%;
		height: 100vh;
	}

	p {
		text-align: center;
		margin: 1em auto;
		font-size: 1.5rem;
		color: white;
	}

	h1 {
		font-size: 8rem;
		font-family: 'Manrope', sans-serif;
		text-decoration: bold;
		font-weight: 800;
		margin: 0.2em;
		color: white;
	}
	h2 {
		text-align: center;
		margin: 0 auto;
		font-size: 2em;
		color: white;
	}
	.header {
		text-align: center;
	}
</style>

<svelte:head>
	<title>Minestom</title>
</svelte:head>

<main>
	<div class="header">
		<h1>Fast</h1>
		<h1>Simple</h1>
		<h1>Dynamic</h1>
	</div>

	<p><b>Minestom</b> is a high-performance, open source server software with 0 Mojang code.</p>
</main>
<br /><br />
<h2>Adding an extension</h2>

<p>Add your extension by adding the topic minestom-server, minestom-library, or minestom-extension. The changes should take around 2 minutes to apply.</p>