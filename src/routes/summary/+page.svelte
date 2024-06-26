<script lang="ts">
    import { onMount } from "svelte";
    import TradeList from "../trade-list/TradeList.svelte";
    import { DB_HOST, DB_PORT } from "$lib/utils/db-info";

    let selectedDate: Date| undefined = new Date();
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

    });

</script>
<svelte:head>
	<title>Trade summary Today</title>
	<meta name="description" content="Trade summary today" />
</svelte:head>

<div>
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