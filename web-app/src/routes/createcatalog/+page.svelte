<script lang="ts">
  import { onMount } from 'svelte';
  import { Checkbox } from 'flowbite-svelte';
  import Header from '../Header.svelte';
  import type { PageServerData } from './$types';

  export let data: PageServerData;

  let selectAll;

  onMount(() => {
      selectAll = () => {
      const allChecked = data.songResults.every(song => song.done);
      data.songResults = data.songResults.map(song => ({ ...song, done: !allChecked }));
    };
    const toggle = song => {
      song.done = !song.done;
    };
  });


</script>

<section>
  <div id="search">
    <h1>Search for a song</h1>
    <form action="?/searchapi" method="post">
      <label for="songId">Search Term</label>
      <input type="text" name="songId" id="songId" placeholder="Search for a song or artist." required />
      <input type="number" name="limit" id="limit" placeholder="How many songs?" required />
      <button type="submit">Search</button>
    </form>
  </div>
</section>

<form action="?/sendCatalogToDB" method="post">
  <button type="button" on:click={selectAll}>Select All</button>
  <button type="submit">Submit</button>
  {#each data.songResults as song}
    <label style="display: flex; align-items: center;">
      <input type="checkbox" bind:checked={song.done} on:change={() => toggle(song)} name="selectedSongs" value={song.trackId} style="margin-right: 5px;" />
      <img src={song.artworkUrl60} style="margin-right: 5px;" /> [{song.trackPrice}] {song.trackName}, {song.artistName}
      <input type="hidden" name={`selectedSong[${song.trackName}]`} value={JSON.stringify(song)} />
    </label>
  {/each}
</form>

<style>
  .boxes {
    border: 1px solid #000000;
    width: 50%;
  }

  form button {
    margin-top: 1rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #eeeeee;
    margin-bottom: 1rem;
  }
</style>
