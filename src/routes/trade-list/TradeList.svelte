<script lang="ts">
    import { onDestroy, onMount } from 'svelte';
    import { OptionTrade } from '../trade-detail/trade'
    import AddTrade from '../trade-detail/AddTrade.svelte';
    import { DB_HOST, DB_PORT } from '../../lib/utils/db-host';
    import TradeItem from './TradeItem.svelte';

    let tradeList: OptionTrade[] = [];
  

    

    onMount(() => {
		console.log('TradeList mounted');
		fetch(`${DB_HOST}:${DB_PORT}/api/option_trades`)
			.then(response => response.json())
			.then(obj => {
                tradeList = [...obj.data];
                console.log("TradeList:", tradeList);
            });
	});

    onDestroy(() => {
       
    });
</script>

<svelte:head>
    <title>Trade Records</title>
    <meta name="description" content="Trade Records" /> 
</svelte:head>
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