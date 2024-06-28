<script lang="ts">
    import { page } from '$app/stores';
    import { addAccount } from '$lib/utils/db-api';
    import { Account } from './account';

    let account: Account = new Account(0, '');

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
        <label for='email'>Email</label>
        <input type='email' id='email' bind:value={account.email} />

        <label for="balance"> Balance </label>
        <input type="number" id="balance" bind:value={account.balance} required />

        <button type="submit">Add Account</button>
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