<script lang="ts">
    import {  onMount } from "svelte";
    import TradeList from "../trade-list/TradeList.svelte";
    import { Account, currentAccountStore } from "../account-detail/account";
  import { calcBalance } from "$lib/utils/accounts-utils";

    let selectedDate: Date| undefined = new Date();
    let currentAccount: Account | undefined = undefined;
    function nextDaySummary() {
        if(selectedDate === undefined) {
            selectedDate = new Date();
        }
        selectedDate = new Date(selectedDate.setDate(selectedDate.getDate() + 1));
        console.log('Next day summary', selectedDate.toDateString());
    } 
    function previousDaySummary() {
        if(selectedDate === undefined) {
            selectedDate = new Date();
        }
        selectedDate = new Date(selectedDate.setDate(selectedDate.getDate() - 1));
        console.log('Previous day summary', selectedDate.toDateString());
    }
    function toggleDisplay() {
        console.log('Toggle display');
        if(!!selectedDate) {
            selectedDate = undefined;
        } else {
            selectedDate = new Date();
        }
    }
    onMount(() => {
        console.log('Trade summary mounted');
        currentAccountStore.subscribe((value) => {
            console.log('Current Account:', value);
            currentAccount = value;
            if(currentAccount === undefined) {
                console.error('Current Account is not defined');
                // redirect to the home page
                window.location.href = '/';
            }
        });
    });

    let openDetails = false;

</script>
<svelte:head>
	<title>Trade summary Today</title>
	<meta name="description" content="Trade summary today" />
</svelte:head>

<div>
    <div class="balance" role="button" tabindex="0" 
    on:click={() => openDetails = !openDetails} 
    on:keydown={() => openDetails = !openDetails}>
    Account Balance: ${currentAccount && calcBalance(currentAccount)}</div>
    {#if openDetails}
        <div style="background-color: skyblue">
            <span style="font-weight: bold;">{currentAccount && currentAccount.name}:</span>
            <span>Cash: ${currentAccount && currentAccount.cash.toFixed(2)},</span>
            <span>Asset: ${currentAccount && currentAccount.asset.toFixed(2)}</span>
        </div>
    {/if}
    <div class="container">
    <button type="button" on:click={previousDaySummary} on:keydown={previousDaySummary}>
        <img src="/caret-left.svg" alt="caret-left" />
    </button>
    <div class="column">
    <h1>Trade summary {!selectedDate ? ' in Total' : (selectedDate.toDateString() == new Date().toDateString() ? 'Today': 'on '+ selectedDate.toDateString())}</h1>
    <button type="button" on:click={toggleDisplay}>
        Show {!!selectedDate ? 'All': 'Today'}
    </div>
    <button type="button" on:click={nextDaySummary} on:keydown={nextDaySummary}>
        <img src="/caret-right.svg" alt="caret-right" />
    </button>
    </div>
    
    <TradeList selectedDate = {selectedDate}/>
</div>

<style>
    .balance {
        font-size: large;
        font-weight: bold;
        background-color: aliceblue;
    }
    .balance:hover {
        cursor: pointer;
        background-color: skyblue;
    }
    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
    }
    .column {
        display: flex;
        flex-direction: column;

    }   
    img {
        width: 50px;
        height: 50px;
    }
</style>