<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

    import { Account, TradingAccounts } from "../account-detail/account";
    import { fetchAllAccounts } from '$lib/utils/db-api';
    import AddAccountButton from '../account-detail/AddAccountButton.svelte';
	let tradingAccounts: Account[] = [];
	onMount(async () => {
		tradingAccounts = await fetchAllAccounts();
		console.log('All accounts:', tradingAccounts);
		TradingAccounts.set(tradingAccounts);
	});	

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
				<li>Account:{account.name}, Balance:{account.balance}</li>
			{/each}
		</ul>
	{:else}
		<p>No Accounts yet</p>
	{/if}
	<AddAccountButton />

</div>
