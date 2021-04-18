
<script lang="ts">
	export let segment: string;
</script>

<style lang="scss">
	nav {
		border-bottom: 0px;

		font-weight: 300;
		padding: 0px;

		background: var(--background);

		display: flex;
		flex-flow: row wrap;
    	justify-content: space-between;
		color: white;

	}
	
	div {
		flex: 1;
		display: flex;
		align-items: center;
		padding: 0px 20px;

		&.center {
			justify-content: center;
			font-size: 1.5em;
		}

		&.left {
			justify-content: flex-start;
		}

		&.right {
			justify-content: flex-end;
		}
	}

	.current {
		position: relative;
		display: inline-block;
		transition: 1s;

		&::after {
			position: absolute;
			content: '';
			width: calc(100% - 1em);
			height: 5px;
			background-color: white;
			display: block;
			bottom: -1px;
		}
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
	
	img {
		object-fit: scale-down;
		height: 32px;
		transition: 50ms;

		&:hover {
			transform: scale(1.1);
		}
	}
	/* Page Button fancy css */
	
	a {
		display: inline-block;
		vertical-align: middle;
		-webkit-transform: perspective(1px) translateZ(0);
		transform: perspective(1px) translateZ(0);
		box-shadow: 0 0 1px rgba(0, 0, 0, 0);
		position: relative;
		overflow: hidden;

		&:before {
			content: "";
			position: absolute;
			z-index: -1;
			left: 0;
			right: 0;
			bottom: 0;
			background: white;
			height: 4px;
			-webkit-transform: translateY(4px);
			transform: translateY(4px);
			-webkit-transition-property: transform;
			transition-property: transform;
			-webkit-transition-duration: 100MS;
			transition-duration: 100MS;
			-webkit-transition-timing-function: ease-out;
			transition-timing-function: ease-out;
		}
	}
	
	a:hover:before, a:focus:before, a:active:before {
		-webkit-transform: translateY(0);
		transform: translateY(0);
	}
</style>

<nav>
	<div class="left">
		<a class="{segment === "/" ? "current" : ""}" href=".">home</a>
		<a class="{segment === "/about" ? "current" : ""}" href="/about">about</a>
		<a rel=prefetch class="{segment.includes("/extensions") ? "current" : ""}" href="/extensions">extensions</a>
	</div>
	<div class="center">
		<p>Minestom</p>
	</div>
	<div class="right">
		<a href="https://wiki.minestom.com">
			<img src="https://avatars.githubusercontent.com/u/7111340?s=400&v=4" alt="Github"/>
		</a>
		<a href="https://github.com/Minestom/Minestom">
			<img src="https://pngimg.com/uploads/github/github_PNG63.png" alt="Github"/>
		</a>
		<a href="https://discord.com/invite/pkFRvqB">
			<img src="https://discord.com/assets/2c21aeda16de354ba5334551a883b481.png" alt="Discord"/>
		</a>
	</div>
</nav>