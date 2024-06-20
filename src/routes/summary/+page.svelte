<script lang="ts">
    import { onMount } from "svelte";
    import TradeList from "../trade-list/TradeList.svelte";

    let selectedDate: Date = new Date();
    let tradeListInstance: any;
    function nextDaySummary() {
        
        selectedDate = new Date(selectedDate.setDate(selectedDate.getDate() + 1));
        console.log('Next day summary', selectedDate.toDateString());
    } 
    function previousDaySummary() {
        
        selectedDate = new Date(selectedDate.setDate(selectedDate.getDate() - 1));
        console.log('Previous day summary', selectedDate.toDateString());
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
    <h1>Trade summary {selectedDate.toDateString() == new Date().toDateString() ? 'Today': 'on '+ selectedDate.toDateString()}</h1>
    <button type="button" on:click={nextDaySummary} on:keydown={nextDaySummary}>
        <img src="/caret-right.svg" alt="caret-right" />
    </button>
    </div>
    <p>
        This is a summary of your trades today.
    </p>
   
    <TradeList selectedDate = {selectedDate}/>
</div>

<style>
    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
    }
    img {
        width: 50px;
        height: 50px;
    }
</style>