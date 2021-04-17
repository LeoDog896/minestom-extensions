
<script lang="ts">
	export let segment: string;
</script>

<style lang="scss">
	nav {
		border-bottom: 1px solid;
		border-image-source: linear-gradient(to left, var(--orange), var(--pink));
		border-image-slice: 1;
		font-weight: 300;
		padding: 0 1em;
		background: --var(background);
	}
	ul {
		margin: 0;
		padding: 0;
	}
	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}
	li {
		display: block;
		float: left;
		color: white;
		font-size: 18px;

		&.social {
			float: right;
			text-align: right;
		}
	}
	.current {
		position: relative;
		display: inline-block;
		transition: 1s;
	}
	.current::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 5px;
		background-color: white;
		display: block;
		bottom: -1px;
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
	
	.pagebutton {
		display: inline-block;
		vertical-align: middle;
		-webkit-transform: perspective(1px) translateZ(0);
		transform: perspective(1px) translateZ(0);
		box-shadow: 0 0 1px rgba(0, 0, 0, 0);
		position: relative;
		overflow: hidden;
	}
	
	.pagebutton:before {
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
	
	.pagebutton:hover:before, .pagebutton:focus:before, .pagebutton:active:before {
		-webkit-transform: translateY(0);
		transform: translateY(0);
	}
</style>

<nav>
	<ul>
		<li class="pagebutton"><a class="{segment === "/" ? "current" : ""}" href=".">home</a></li>
		<li class="pagebutton"><a class="{segment === "/about" ? "current" : ""}" href="/about">about</a></li>

		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
		<li class="pagebutton"><a rel=prefetch class="{segment === "/extensions" ? "current" : ""}" href="/extensions">extensions</a></li>

		<li class="social">
			<a href="https://wiki.minestom.com">
				<img src="https://avatars.githubusercontent.com/u/7111340?s=400&v=4" alt="Github"/>
			</a>
		</li>
		<li class="social">
			<a href="https://github.com/Minestom/Minestom">
				<img src="https://pngimg.com/uploads/github/github_PNG63.png" alt="Github"/>
			</a>
		</li>
		<li class="social">
			<a href="https://discord.com/invite/pkFRvqB">
				<img src="https://discord.com/assets/2c21aeda16de354ba5334551a883b481.png" alt="Discord"/>
			</a>
		</li>
	</ul>
</nav>