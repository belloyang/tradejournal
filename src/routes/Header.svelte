<script lang="ts">
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
    import { onMount } from 'svelte';
    import { Account, currentAccountStore } from './account-detail/account';
	
	let currentAccount: Account | undefined = $currentAccountStore;

	let isAccountMenuOpen = false;
  
	function toggleDropdown() {
		isAccountMenuOpen = !isAccountMenuOpen;
	}	
	function exitAccount() {
		if(currentAccount && confirm('Do you want to exit the current account?')) {
			currentAccountStore.set(undefined);
			window.location.href = '/';
		} else {
			console.log('Exit Account Cancelled');
		}
		isAccountMenuOpen = false;
		
	}
	onMount(() => {
		console.log('Header mounted');
		currentAccountStore.subscribe((value) => {
			currentAccount = value;
		});
	});
</script>

<header>
	<div class="corner">
		<a href="https://kit.svelte.dev">
			<img src={logo} alt="SvelteKit" />
		</a>
	</div>

	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/summary' ? 'page' : undefined}>
				<a href="/summary">Summary</a>
			</li>
			<li aria-current={$page.url.pathname === '/account-list' ? 'page' : undefined}>
				<a href="/account-list">Accounts</a>
			</li>
			<li aria-current={$page.url.pathname === '/calendar-view' ? 'page' : undefined}>
				<a href="/calendar-view">Calendar View</a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about">About</a>
			</li>
			
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>

	<div class="corner">
		<div class="column btn" role="button" tabindex="0" on:click={toggleDropdown} on:keydown={toggleDropdown} >
		<img src='/trading-account.svg' alt="trading-acount" />
		<label for="acount-name" style="font-size: small;">{currentAccount === undefined ? 'N/A': currentAccount.name}</label>
		</div>
		<div class="dropdown-content" style="display: {isAccountMenuOpen ? 'block': 'none'}">
			<div class="menu">
			  <span class="option"> <a href="/account-list" on:click={() => isAccountMenuOpen = false}>Switch Account</a></span>
			  <span class="option"><a href="/account-detail" on:click={() => isAccountMenuOpen = false}>Add Account</a></span>
			  <span class="option"><a href='/account-detail?accountId={currentAccount && currentAccount.id}' on:click={() => isAccountMenuOpen = false}>Reset Account</a></span>
			<button class="option" on:click={exitAccount} aria-label="Exit Account" disabled={!currentAccount}>Exit Account</button>
			</div>
			
		  </div>
	</div>
	

</header>

<style>
	.dropdown-content {
		
		position: absolute;
		background-color: white;
		min-width: 160px;
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
		z-index: 1;
		right: 10px;
	}
	.option {
		cursor: pointer;
		text-align: center;
	}
	.option:hover {
		background-color: lightblue;
	}
	.btn {
		cursor: pointer;
	}
	.menu {
		display: flex;
		align-items: left;
		justify-content: start;
		flex-direction: column;
	}
	.column {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 1em;
	}
	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		width: 3em;
		height: 3em;
	}

	.corner img {
		width: 1.5em;
		height: 1.5em;
		object-fit: contain;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
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
</style>
