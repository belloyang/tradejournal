<script lang="ts">
    import { onDestroy, onMount } from 'svelte';
    import { OptionTrade, optionTrades } from '../trade-detail/trade'
    import AddTrade from '../trade-detail/AddTrade.svelte';

    let tradeList: OptionTrade[] = [];
    const unsubscribe = optionTrades.subscribe((trades) => {
        tradeList = trades;
        console.log('TradeList updated', tradeList);
    });

    onMount(() => {
        console.log('TradeList mounted', tradeList);
    });

    onDestroy(() => {
        unsubscribe();
    });
</script>

<svelte:head>
    <title>Trade Records</title>
    <meta name="description" content="Trade Records" /> 
</svelte:head>
<ul>
    {#each tradeList as trade}
        <li>
            <p>{trade.symbol}</p>
            <p>{trade.strike}</p>
            <p>{trade.optionType}</p>
            <p>{trade.quantity}</p>
            <p>{trade.premium}</p>
            <p>{trade.expiration}</p>
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