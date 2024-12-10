<script>
	let videoSource = "/background.mp4"
	let motto = "/motto.png"
</script>

<svelte:head>
	<link rel="stylesheet" href="https://use.typekit.net/mpc8rgj.css">
	<title>Home</title>
	<meta name="description" content="Web App" />
</svelte:head>

<section>
	<video id = "background_video"autoplay loop muted>
		<source src="{videoSource}" type="video/mp4" />
	</video>
	<h1 class= "title">Welcome to MyDriver</h1>
	<h1 class = "motto">Where Miles Equal Smiles</h1>
	<a href = "/login">
		<button class = "login">Get Started</button>
	</a>
	
</section>

<style>
	/* @keyframes SlideLeft {
		0% {
    		transform: translateX(-100%);
		}
		100% {
		transform: translateX(0);
  		}
	}
	.left {
		animation: 2s ease-out 0s 1 SlideLeft;
	} */
	.title{
		font-size: 90px;
		font-family: "acier-bat-outline", sans-serif;
		font-weight: 400;
		font-style: normal;
		color:white;
	}
	.motto{
		font-size: 62px;
		font-family: "acier-bat-outline", sans-serif;
		font-weight: 400;
		font-style: normal;
		color:white;
		
	}
	#background_video {
		width: 100vw;
		height: 100vh;
		object-fit: cover;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: -1;
	}
	.login {
		float:right;
		font-size: 44px;
		margin-top:25vh;
		margin-right:20%;	
		position:relative;
		padding:5px;
		font-family: "acier-bat-outline", sans-serif;
		font-weight: 400;
		font-style: normal;
		color:white;
		transition: color 0.2s linear;
	}
	.login:hover {
		color:lightblue;
	}
</style>