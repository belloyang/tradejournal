<script lang="ts">
    import { onDestroy, onMount } from 'svelte';
    import { OptionTrade, TradeStatus } from '../trade-detail/trade'
    import AddTrade from '../trade-detail/AddTrade.svelte';
    import { DB_HOST, DB_PORT } from '../../lib/utils/db-host';
    import TradeItem from './TradeItem.svelte';

    export let selectedDate: Date| undefined = undefined;
    let tradeList: OptionTrade[] = [];
    let openTrades: OptionTrade[] = [];
    let closedTrades: OptionTrade[] = [];
  
    let modifierStr: string = '';
    $: selectedDateChanged(selectedDate);

    function selectedDateChanged(updatedDate: Date|undefined) {
        console.log('Selected date changed:', updatedDate);
        selectedDate = updatedDate;
        initialize();
    }


    function modifier(): string {
        console.log("modifier", selectedDate);
        if(selectedDate === undefined) {
            return "in total";
        } else if(selectedDate.toDateString() == new Date().toDateString()) {
            return "today";
        } else {
            return "on " + selectedDate.toDateString();
        }
    }
    function formatDate(date: Date) {
        
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    }
    function initialize() {
        let apiURL = `${DB_HOST}:${DB_PORT}/api/option_trades`;
        if(selectedDate !== undefined) {
            apiURL = `${DB_HOST}:${DB_PORT}/api/option_trades?created_at=${formatDate(selectedDate)}`;
        }
        console.log('API URL:', apiURL);
        fetch(apiURL).then(response => response.json())
            .then(obj => {
                tradeList = [...obj.data];
                openTrades = tradeList.filter((trade) => trade.status == TradeStatus.OPEN);
                closedTrades = tradeList.filter((trade) => trade.status == TradeStatus.CLOSED);
                console.log("Trades of the day:", tradeList, selectedDate && selectedDate.toDateString());
            });
        modifierStr = modifier();
    }

    onMount(() => {
		console.log('TradeList mounted');
        initialize();
		
	});

    onDestroy(() => {
       
    });

</script>

<svelte:head>
    <title>Trade Records</title>
    <meta name="description" content="Trade Records" /> 
</svelte:head>

<p>You have {tradeList.length} trade{tradeList.length<=1?'' : 's'} created {modifierStr}!</p>
{#if tradeList.length > 0}
<div class="container">
    <div class="trades" id="open-trades">
      <h2>Open trades</h2>
      <ul>
        {#if openTrades.length > 0}
          {#each openTrades as trade}
            <li>
              <TradeItem {trade} />
            </li>
          {/each}
        {:else}
          <li class="no-trades">No open trades</li>
        {/if}
      </ul>
    </div>
  
    <div class="trades" id="closed-trades">
      <h2>Closed trades</h2>
      <ul>
        {#if closedTrades.length > 0}
          {#each closedTrades as trade}
            <li>
              <TradeItem {trade} />
            </li>
          {/each}
        {:else}
          <li class="no-trades">No closed trades</li>
        {/if}
      </ul>
    </div>
  </div>
{/if}

<AddTrade />

<style>
   .container {
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }

  .trades {
    width: 45%;
  }

  h2 {
    font-size: 1.5em;
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }

  li:last-child {
    border-bottom: none;
  }

  .no-trades {
    color: #888;
    font-style: italic;
  }
</style>