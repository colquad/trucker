<script lang="ts">
	// @ts-ignore
    import { page } from '$app/stores'; // Import $page from SvelteKit stores
	// @ts-ignore
	import { Modal, Content, Trigger}  from "sv-popup"

    import type { PageServerData } from './$types';
	export let data: PageServerData;

</script>

<svelte:head>
	<title>Application</title>
	<meta name="description" content="Driver Application Form" />
</svelte:head>

<section>
    <div id ="apply">
        <h1>Apply</h1>
        <div class ="box">
            <div class = "apply">
                <form action="?/apply" method="post">
                    <label for="text">Full Name</label>
                    <input type="text" name="name" id="name" placeholder="First and Last Name" required>
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label>Which company would you like to Sponsor you?</label>
                    <select name="sponsor">
                        <option value="sponsor" selected disabled>Sponsor</option>
                        {#each data.sponsor as s}
                            <option value={s.sponsor_id}{s.sponsor_name}>{s.sponsor_name}</option>
                        {/each}
                    </select>
                    <label for="text">Why would you like this sponsorship?</label>
                    <textarea id="reason" name="reason" rows="10" cols="50"></textarea>
                    <button type="submit">Submit Application</button>
                </form>
            </div>
        </div>
    </div>
</section>
<style>
    .box {
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding:10px;
    }
    .apply {
        justify-content: center;
		background-color: white;
		border-radius: 25px;
		box-shadow: 0 10px 100px gray;
		display:flex;
        width: 70%;
    }
    textarea {
		border: 1px solid black;
        padding: 5px;
	}
    form {
        font-size: large;
        margin: 10%;
        display: flex;
        flex-direction: column;
    }
    form label {
        margin: 1rem 0;
    }
    form input {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px; 
    }
    form button {
        margin-top: 1rem;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        background: #eeeeee;
    }
    select {
        border: 1px solid #ccc;
        width: 45%;
    }
</style>