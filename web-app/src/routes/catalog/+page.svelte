<script lang="ts">
    import type { PageServerData } from './$types';
    import { Modal, Content, Trigger}  from "sv-popup"
    export let data: PageServerData;
    // @ts-ignore
    // console.log(catalog.data);
    let catalog = data.songList.flatMap(result => result.songResults);
</script>
<svelte:head>
    <title>Catalog</title>
    <meta name="description" content="Sponsor Catalog" />
</svelte:head>
<h1 class = "title">CATALOG PREVIEW</h1>
<a href="/createcatalog">
    <button>Add Songs To Catalog</button>
  </a>
  <a href="/removecatalog">
    <button>Remove Songs From Catalog</button>
  </a>
  <div class = "box">
    <section class = "update">
        <div>
            <Modal basic big={false}>
                <Content>
                    <div id ="points">
                        <h1>Change Point Conversion</h1>
                        <form action="?/changepoints" method="post">
                            <label for="name">Dollar To Point Conversion</label>
                            <input type="name" name="points" id="points" placeholder="Enter a number" required>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </Content>
                <Trigger>
                    <button>Change point conversion?</button>
                </Trigger>
            </Modal>
        </div>
    </section>
</div>
<div class="catalog">
    <ul>
        {#each catalog as song}
            <li><img src={song.artworkUrl60}/>{song.trackName}, {song.artistName}, {song.collectionName}</li>
        {/each}
    </ul>
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

