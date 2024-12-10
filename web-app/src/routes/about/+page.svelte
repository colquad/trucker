<script lang="ts">
	import type { PageServerData } from './$types';
	export let data: PageServerData;
	// @ts-ignore
	$:about = data.about[0]?data.about[0]:undefined;
</script>
<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>
<h1>ABOUT</h1>
<!-- <btn on:click={console.log(about)}>MONKEY</btn> -->
<div class="about">
		<p>Team Number: {about?.team_num}</p>
		<p>Sprint Number: {about?.sprint_num}</p>
		<p>Release Date: {about?.release_date.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })}</p>
		<p>Product Name: {about?.product_name}</p>
		<p>Product Description: {about?.product_description}</p>
</div>

<style>
	.about {
		background-color: white;
		text-align: justify;
		justify-content:center;
		margin-top: 10px;
		margin-left: 10px;
		margin-right: 10px;
		border-style: groove;
		border-color: black;
		padding:10px;
		border-radius: 25px;
		box-shadow: 0 10px 100px gray;
	} 
	.about p {
		/* border-bottom: solid; */
		padding: 10px;
		font-size: large;
		/* font-family: "Gill Sans", sans-serif; */
		font-weight: 700;
	}
</style>
