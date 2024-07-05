<script lang="ts">
	import { onMount } from 'svelte';

    import { Account, currentAccountStore, TradingAccounts } from "../account-detail/account";
    import { fetchAllAccounts } from '$lib/utils/db-api';
    import AddAccountButton from '../account-detail/AddAccountButton.svelte';
	let tradingAccounts: Account[] = [];
	let currentAccount: Account | undefined = $currentAccountStore;
	onMount(async () => {
		tradingAccounts = await fetchAllAccounts();
		console.log('All accounts:', tradingAccounts);
		TradingAccounts.set(tradingAccounts);
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
	<title>Trading Accounts</title>
	<meta name="description" content="Trading Accounts" />
</svelte:head>

<div class="text-column">
	<h1>Trading Accounts</h1>
	{#if tradingAccounts.length > 0}
		<p>There are {tradingAccounts.length} accounts</p>
		<ul>
			{#each tradingAccounts as account}
				<li class="row"><button on:click={selectAccount(account)} disabled={currentAccount && account.id === currentAccount.id}>
					Acount:{account.name}, Balance:{account.balance}</button>
					{#if currentAccount && account.id === currentAccount.id}
						<img src="/check.svg" alt="Checkmark"/>
					{/if}
				</li>
			{/each}
		</ul>
	{:else}
		<p>No Accounts yet</p>
	{/if}
	<AddAccountButton />

</div>

<style>
	.row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.text-column {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	ul {
		list-style-type: none;
		padding: 0;
	}
	li {
		margin: 0.5em;
	}
	button:disabled {
		background-color: lightgray;
	}
	button {
		padding: 0.5em;
		background-color: #007bff;
		color: white;
		border: none;
		cursor: pointer;
	}
	button:not(:disabled):hover {
		background-color: #0056b3;
	}
	img {
		width: 2em;
		height: 2em;
		/* set green color */
		filter: invert(42%) sepia(92%) saturate(2496%) hue-rotate(92deg) brightness(96%) contrast(101%);
	}
</style>