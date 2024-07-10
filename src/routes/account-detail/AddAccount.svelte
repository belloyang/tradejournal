<script lang="ts">
    import { addAccount } from '$lib/utils/db-api';
    import { Account } from './account';

    let account: Account = new Account('');

    function handleSubmit() {
        addAccount(account).then((response) => {
            console.log('Account added:', response);
        }).catch((error) => {
            console.error('Error adding account:', error);
        })
        // navigate to Account List
        window.location.href = '/account-list';
    }
</script>

<svelte:head>
    <title>Add Account</title>
    <meta name="description" content="Add Account" />
</svelte:head>

<div class="text-column">
    <h1>Add Account</h1>

    <form on:submit|preventDefault={handleSubmit}>
        <div class="container">
        <label for="accountName">Account Name</label>
        <input type="text" id="accountName" bind:value={account.name} required />
        <label for='cash'>Cash/Buying Power</label>
        <input type='number' id='cash' step="0.01" bind:value={account.cash} />
        <label for='asset'>Asset</label>
        <input type='number' id='asset' step="0.01" bind:value={account.asset} />

        <button type="submit">Add Account</button>
        <button on:click={() => window.location.href = '/account-list'}>Cancel</button>
        </div>
    </form>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        margin: 0 auto;
    }
</style>