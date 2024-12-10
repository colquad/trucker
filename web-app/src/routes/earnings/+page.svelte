<script lang="ts">
	import { redirect } from '@sveltejs/kit';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
	// @ts-ignore
	import { Modal, Content, Trigger}  from "sv-popup"
	import { stringify } from 'postcss';

	// @ts-ignore
	$:user = data.user[0]?data.user[0]:undefined;
	// @ts-ignore
	// $:sponsor =  data.sponsor?data.sponsor:undefined;
	let sponsor:string[]=[];
	for(let i=0;i<data.sponsor.length;i++){
		sponsor.push(data.sponsor[i]);
	}
	console.log(sponsor);
	let type = data.type;
	let flag = false;
	let selected;
</script>
<svelte:head>
	<title>Earnings</title>
	<meta name="description" content="About this app" />
</svelte:head>
<h1 class = "title">POINTS</h1>
	<select bind:value={selected}>
		<option value="sponsor" selected disabled>Sponsor</option>
		{#each sponsor as row,index}
			<option value={index} >{row.sponsor_name}</option>
		{/each}
	</select>

	<div class="earnings">
		<p>{sponsor[selected]?.points??'Points'}</p>
	</div>
	<div class = "redirect">
		<a href="/store">Spend your points</a>
	</div>
	<Modal basic small = true>
		<Content>
			<div id="appeal">
				<h1>Have an issue?</h1>
				<form action="" method="post">
					<label for="email">Email</label>
					<input type="email" name="email" id="email" placeholder="Enter your email" required>
					<label for="text">Please explain your issue</label>
					<textarea id="text" name="text" rows="10" cols="100"></textarea>
					<button type="submit">Submit</button>
				</form>
			</div>
		</Content>
		<Trigger>
			<p class = "appeal">Have an issue? Appeal here</p>
		</Trigger>
	</Modal>
<style>
	.appeal {
		margin-top: 5%;
		text-decoration: underline;
	}
	textarea {
		border: 1px solid black;
	}
	.title  {
		justify-content: center;
		/* text-decoration: underline; */
		font-size: 55px;
		/* font-family: "Gill Sans", sans-serif; */
	}
	.earnings {
		margin-top: 10px;
		align-self: center;
		align-items: center;
		justify-content: center;
		text-align: center;
		background-color: white;
		width:300px;
		height:300px;
		border-radius: 50%;
		box-shadow: 0 10px 100px gray;
		display:flex;
	} 
	.earnings p {
		/* border-bottom: solid; */
		font-size: x-large;
		/* font-family: "Gill Sans", sans-serif; */
		font-weight: 700;
	}
	.redirect {
		justify-self: center;
		text-align: center;
		margin-top: 10px;
	}
	.redirect a{
		
		font-size: large;
	}
	button {
        margin-top: 1rem;
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
