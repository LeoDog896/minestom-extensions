
<script lang="ts">
	export let segment: string;
</script>

<style lang="scss">
	#top-bar {
    height: 42px;
    width: 100%;
    display: flex;
    flex-flow: row-reverse;
    position: sticky;
    top: 0;
    background-color: var(--black);
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
    z-index: 999;

    > a {
        display: flex;
        align-items: center;
        padding: 5px 10px;
        color: var(--light-gray);
        font-family: 'Poppins', sans-serif;

        @media screen and (max-width: 450px) {
            font-size: 0;
        }
        
        > img {
            margin-right: 6px;
        }

        &:hover {
            transition-duration: .5s;
            background-color: var(--gray);
            border-bottom: var(--orange) 3px;
        }
    }

    a:any-link {
		text-decoration: none;
		text-decoration: none;
		font-family: 'Poppins', sans-serif;
		color: whitesmoke;
	}

}
</style>

<div id="top-bar">
	<a href="https://package.krystilize.com/extensions">
		<img src="https://github.com/Minestom/minestom.net/blob/master/static/svg/extension_icon.svg?raw=true" alt="Extensions" height="32">
		Extensions
	</a>
	<a href="https://github.com/Minestom/Minestom">
		<img src="https://github.com/Minestom/minestom.net/blob/master/static/img/GitHub-Mark-Light-64px.png?raw=true" alt="GitHub" height="32">
		GitHub
	</a>
	<a href="https://discord.gg/rV24CzG">
		<img src="https://github.com/Minestom/minestom.net/blob/master/static/img/Discord-Logo-White.png?raw=true" alt="Discord" height="32">
		Discord
	</a>
	<a href="https://wiki.minestom.com/">
		<img src="https://github.com/Minestom/minestom.net/blob/master/static/svg/gitbook-icon.svg?raw=true" alt="GitBook" height="32">
		Wiki
	</a>
</div>