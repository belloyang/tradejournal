<script lang="ts">
    import { onDestroy, onMount } from 'svelte';
    import { OptionTrade } from '../trade-detail/trade'
    import AddTrade from '../trade-detail/AddTrade.svelte';
    import { DB_HOST, DB_PORT } from '../../lib/utils/db-host';
    import TradeItem from './TradeItem.svelte';

    export let selectedDate: Date| undefined = undefined;
    let tradeList: OptionTrade[] = [];
  

    function modifier(): string {
        if(selectedDate === undefined) {
            return "in total";
        } else if(selectedDate.toDateString() == new Date().toDateString()) {
            return "today";
        } else {
            return "on " + selectedDate.toDateString();
        }
    }

    onMount(() => {
		console.log('TradeList mounted');
        let apiURL = `${DB_HOST}:${DB_PORT}/api/option_trades`;
        if(selectedDate !== undefined) {
            apiURL = `${DB_HOST}:${DB_PORT}/api/option_trades?created_at=${selectedDate.toDateString()}`;
        }
        fetch(apiURL).then(response => response.json())
            .then(obj => {
                tradeList = [...obj.data];
                console.log("Trades of today:", tradeList, selectedDate && selectedDate.toDateString());
            });
		
	});

    onDestroy(() => {
       
    });

</script>

<svelte:head>
    <title>Trade Records</title>
    <meta name="description" content="Trade Records" /> 
</svelte:head>

<p>You have {tradeList.length} trade{tradeList.length<=1?'' : 's'} created {modifier()}!</p>
<ul>
    {#each tradeList as trade}
        <li>
           <TradeItem trade={trade}/>
        </li>
    {/each}
</ul>
<AddTrade />

<style>
    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        border: 1px solid black;
        margin: 5px;
        padding: 5px;
    }
</style>