<script lang="ts">
  import { onMount } from "svelte";
    import AddAccount from "./AddOrResetAccount.svelte";
  import { fetchAccountById } from "$lib/utils/db-api";
  import { Account } from "./account";

	let account: Account = new Account('');
	let accountId: string | null = null;
    onMount(() => {
        console.log('Account detail mounted');
        // get the accountId parameter
        const urlParams = new URLSearchParams(window.location.search);
        accountId = urlParams.get('accountId');
        console.log('Account Id:', accountId);
        if(accountId !== null) {
            // fetch the account details
            fetchAccountById(accountId).then((response) => {
                console.log('Account fetched:', response);
                account = response;
            }).catch((error) => {
                console.error('Error fetching account:', error);
            });
        }
    });
</script>
<svelte:head>
	<title>Account Details</title>
	<meta name="description" content="Account Details" />
</svelte:head>

<div class="text-column">
	<h1>Account Details</h1>

    <AddAccount {account} reset={accountId!== null}/>


</div>
