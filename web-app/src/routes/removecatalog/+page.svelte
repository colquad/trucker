<script lang="ts">
	import type { PageServerData } from './$types';
  	import { onMount } from 'svelte';
	export let data: PageServerData;

	//let catalog = data.songList;
	let catalog = data.songList.flatMap(result => result.songResults);
	console.log(catalog);

	let selectAll;

	onMount(() => {
		selectAll = () => {
			const allChecked = catalog.every(song => song.done);
			catalog = catalog.map(song => ({ ...song, done: !allChecked }));
		};

		const toggle = song => {
			song.done = !song.done;
		};
	});

</script>
<svelte:head>
	<title>Catalog</title>
	<meta name="description" content="Sponsor Catalog" />
</svelte:head>
<h1 class = "title">Remove From Catalog</h1>

<div class="catalog">
  <form action="?/removeFromCatalog" method="post">
    <button type="button" on:click={selectAll}>Select All</button>
    <button type="submit">Submit</button>
		{#each catalog as song}
      		<label style="display: flex; align-items: center;">
        		<input type="checkbox" bind:checked={song.done} on:change={() => toggle(song)} name="selectedSongs" value={song?.trackId} style="margin-right: 5px;" />
        		<img src={song?.artworkUrl60} style="margin-right: 5px;" /> [{song?.trackPrice}] {song?.trackName}, {song?.artistName}
      		</label>
    	{/each}
  </form>
</div>
<style>
	.title  {
		justify-content: center;
		text-decoration: underline;
		font-size: 55px;
		/* font-family: "Gill Sans", sans-serif; */
	}
	.catalog {
		text-align: justify;
		justify-content:center;
		margin-top: 20%;
		margin-left: 10px;
		margin-right: 10px;
		border-style: groove;
		border-color: black;
		padding:10px;
		border-radius: 25px;
		box-shadow: 0 10px 100px gray;
	} 
	.catalog p {
		/* border-bottom: solid; */
		padding: 10px;
		font-size: large;
		/* font-family: "Gill Sans", sans-serif; */
		font-weight: 700;
	}
	button {
    margin-top: 1rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #eeeeee;
    margin-bottom: 1rem;
  }
</style>
