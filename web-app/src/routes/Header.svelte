<script lang="ts">
	import { page } from '$app/stores';
	// @ts-ignore
	import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
	export let type;
	console.log(type);
	
	let isAuthenticated = false;
	if(type&&type!=''){
		isAuthenticated=true;
	}
</script>

{#if isAuthenticated===false}
<header>
	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about">About</a>
			</li>
			<!-- <li aria-current={$page.url.pathname === '/login' ? 'page' : undefined}>
				<a href="/login">Login</a>
			</li> -->
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>
	<div class = profile>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
	<div class =profile_drop>
		<button class = "login" aria-current={$page.url.pathname === '/login' ? 'page' : undefined}>
			<a href="/login">Login</a>
		</button>
	</div>
	<svg viewBox="0 0 2 3" aria-hidden="true">
		<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
	</svg>
	</div>
</header>
{/if}
{#if isAuthenticated}	
<header>
	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about">About</a>
			</li>
			{#if type==='S'}
				<li aria-current={$page.url.pathname === '/points' ? 'page' : undefined}>
					<a href="/points">Points</a>
				</li>
				<li aria-current={$page.url.pathname === '/catalog' ? 'page' : undefined}>
					<a href="/catalog">Catalog</a>
				</li>
				<li aria-current={$page.url.pathname === '/applications' ? 'page' : undefined}>
					<a href="/applications">Applications</a>
				</li>
			{/if}

			{#if type==='D'}
				<li aria-current={$page.url.pathname === '/apply' ? 'page' : undefined}>
					<a href="/apply">Apply</a>
				</li>
				<li aria-current={$page.url.pathname === '/store' ? 'page' : undefined}>
					<a href="/store">Store</a>
				</li>
			{/if}
			{#if type==='A'}
				<li aria-current={$page.url.pathname === '/admin' ? 'page' : undefined}>
					<a href="/admin">Accounts</a>
				</li>
				<li aria-current={$page.url.pathname === '/applications' ? 'page' : undefined}>
					<a href="/applications">Applications</a>
				</li>
				<li aria-current={$page.url.pathname === '/points' ? 'page' : undefined}>
					<a href="/points">Points</a>
				</li>
				<li aria-current={$page.url.pathname === '/logs' ? 'page' : undefined}>
					<a href="/logs">Logs</a>
				</li>
				<li aria-current={$page.url.pathname === '/sales' ? 'page' : undefined}>
					<a href="/sales">Sales</a>
				</li>
			{/if}

			<!-- <li aria-current={$page.url.pathname === '/login' ? 'page' : undefined}>
				<a href="/login">Login</a>
			</li> -->
		</ul>
		
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>
	<div class = profile>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<div class =profile_drop>
			<button class = "profile_icon">Profile</button>
			<div class = "dropdown_content">
				{#if type=='D'}
					<a href ="/earnings">Earnings</a>
				{/if}
				<a href ="/settings">Settings</a>
				<form action="/login?/logout" method="post">
					<button type="submit"><a>Log Out</a></button>
				</form>
			</div>
			<!-- <Button>
				Profile
			</Button>
			<Dropdown class = "bg-background">
				{#if type==='D'}
				<DropdownItem>
					<form action="/earnings">
						<button type="submit">Earnings</button>
						</form>
				</DropdownItem>
				{/if}
				<DropdownItem>
					<form action="/settings">
						<button type="submit">Settings</button>
					</form>
				</DropdownItem>
				<DropdownItem>
					<form action="/login?/logout" method="post">
						<button type="submit">Log Out</button>
					</form>
				</DropdownItem>
		</Dropdown>	 -->
	</div>
	<svg viewBox="0 0 2 3" aria-hidden="true">
		<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
	</svg>
	</div>
</header>
{/if}
<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	nav {
		display: flex;
		justify-content: center;
		/* --background: rgba(255, 255, 255, 0.7); */
		--background:white;
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}
	.profile {
		display: flex;
		justify-content: center;
		--background:white;
	}
	.profile_drop {
		min-width: 75px;
		position: relative;
		transition: color 0.2s linear;
		height: 3em;
		text-align: center;
		background: var(--background);
	} 
	.login {
		padding-top: 10px;
	}
	.profile_icon {
		padding-top: 10px;
	}
	.dropdown_content {
		margin-top: 10px;
		border-radius: 5px;
		top:50%;
		left:50%;
		transform: translate(-50%,0%);	
		display: none;
		position: absolute;
		background: var(--background);
		/* min-width: 160px; */
		/* 	 */
		z-index: 1;
	}
	.profile_drop:hover .dropdown_content {
		display: block;
	}
	.profile_drop a {
		height: 100%;
		/* align-items: center; */
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	.profile_drop button:hover, a:hover {
		color: var(--color-theme-1);
	}
</style>
