<script lang="ts">
    import type { PageServerData } from './$types';
	export let data: PageServerData;
	// @ts-ignore
    import { page } from '$app/stores'; // Import $page from SvelteKit stores
	// @ts-ignore
	import { Modal, Content, Trigger}  from "sv-popup"

    // @ts-ignore
    $:user = data.user[0]?data.user[0]:undefined;

</script>

<svelte:head>
	<title>Success!</title>
	<meta name="description" content="Application Success" />
</svelte:head>

<section>
    <div>
        <p>You have successfully applied for a sponsorship!</p>
        <Modal basic big={false}>
            <Content>
                <div id ="firstname">
                    <h1>Are you sure?</h1>
                    <form action="?/cancel" method="post">
                        <button type="submit">Yes</button>
                    </form>
                    <form action ="?/undocancel" method="post">
                        <button type="submit">No</button>
                    </form>
                </div>
            </Content>
            <Trigger>
                <button>Cancel your application?</button>
            </Trigger>
        </Modal>
    </div>   
</section>

<style>
    .info {
        z-index: 1;
        background-color: white;
		text-align: center;
		justify-content: center;
		margin-left: 250px;
		margin-right: 250px;
		border-style: groove;
		border-color: black;
		padding:10px;
		border-radius: 25px;
		box-shadow: 0 10px 100px gray;
	}
    .box {
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding:10px;
        margin: 10px;
    }
    .update {
        text-align: center;
        margin: 20px;
        background-color: white;
        padding:10px;
		border-radius: 25px;
		box-shadow: 0 10px 100px gray;
        display:flex;
    }
    #password {
        max-width: 400px;
        margin: 0 auto;
    }

    button {
		margin-top: 1rem;
        margin-bottom: 1rem;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        background: #eeeeee;
	}
    
    form {
        margin-top: 10%;
        margin-bottom: 10%;
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
</style>