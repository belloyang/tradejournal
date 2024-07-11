<script lang="ts">
    import { addAccount, deleteAccountOptionTrades, updateAccount } from '$lib/utils/db-api';
    import { Account, currentAccountStore } from './account';
  import AccountDetail from './AccountDetail.svelte';

    export let reset: boolean = false;
    export let account: Account = new Account('');

    let deleteTrades = true;
    function handleSubmit() {
        if(reset) {
            updateAccount(account).then((response) => {
                console.log('Account updated:', response);
                currentAccountStore.set(account);
                if(deleteTrades) {
                    // delete optionTrades whose accountId equals account.id
                    deleteAccountOptionTrades(account.id).then((response) => {
                        console.log('OptionTrades deleted:', response);
                    }).catch((error) => {
                        console.error('Error deleting optionTrades:', error);
                    });
                }
            }).catch((error) => {
                console.error('Error updating account:', error);
            });
        } else {
            addAccount(account).then((response) => {
                console.log('Account added:', response);
            }).catch((error) => {
                console.error('Error adding account:', error);
            });
        }
    
        // navigate to Account List
        window.location.href = '/account-list';
    }
</script>

<svelte:head>
    <title>{reset? 'Reset': 'Add'} Account</title>
    <meta name="description" content="Add Account" />
</svelte:head>

<div class="text-column">
    <h1>{reset? 'Reset': 'Add'}  Account</h1>

    <form on:submit|preventDefault={handleSubmit}>
        <div class="container">
       
        <AccountDetail account={account} />
        <button type="submit">{reset? 'Reset': 'Add'}  Account</button>
        <button on:click={() => window.location.href = '/account-list'}>Cancel</button>
        </div>
    </form>
    {#if reset}
    <div class="row"><input type="checkbox" bind:checked={deleteTrades} /> Delete Existing trades</div>
    {/if}
    
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        margin: 0 auto;
    }
</style>