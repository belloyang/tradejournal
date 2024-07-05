<script lang="ts">
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
    import CurrentDate from './CurrentDate.svelte';
    import AddTradeButton from './trade-detail/AddTradeButton.svelte';
    import { onMount } from 'svelte';
    import { fetchAllAccounts, fetchAllOptionTrades } from '$lib/utils/db-api';
    import { currentAccountStore, type Account } from './account-detail/account';
    import AddAccountButton from './account-detail/AddAccountButton.svelte';
	let allOptionTrades = [];
	let allAcounts: Account[]= [];
	
	let currentAccount: Account | undefined = $currentAccountStore;
	
	onMount(() => {
		console.log('Home mounted');
		fetchAllOptionTrades().then((trades) => {
			allOptionTrades = trades;
			console.log('All trades:', allOptionTrades);
		});
		fetchAllAccounts().then((accounts) => {
			allAcounts = accounts;
			console.log('All users:', allAcounts);
		});
		currentAccountStore.subscribe((value) => {
			currentAccount = value;
		});
	});

	function selectAccount(account: Account) {
		return function() {
			currentAccountStore.set(account);
		}
	}

	
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="TradeJournal" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</span>

		to <br />TradeJournal App
		<br />
	</h1>
	<CurrentDate />

	{#if allAcounts.length > 0}
		{#if currentAccount}
			<p>Selected Account: {currentAccount.name}</p>
			<AddTradeButton />
		{:else}
		<p style="font-size: large;">You have {allAcounts.length} accounts, select one to start your Trade Journal</p>
		<ul>
			{#each allAcounts as account}
				<li><button on:click={selectAccount(account)}>Acount:{account.name}, Balance:{account.balance}</button></li>
			{/each}
		</ul>
		{/if}
	{:else}
		<p>Please create an trading account to start with</p>
	{/if}
	<br />
	<AddAccountButton/>

</section>


<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
	button {
		cursor: pointer;
	}
</style>
