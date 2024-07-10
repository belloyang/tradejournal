<script lang="ts">
    import { addAccount } from '$lib/utils/db-api';
    import { Account } from './account';
  import AccountDetail from './AccountDetail.svelte';

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
       
        <AccountDetail account={account} />
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