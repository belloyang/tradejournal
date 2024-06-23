<script lang="ts">
    import { onDestroy, onMount } from 'svelte';
    import { OptionTrade, TradeStatus, OptionTrades } from '../trade-detail/trade'
    import AddTradeButton from '../trade-detail/AddTradeButton.svelte';
    import TradeItem from './TradeItem.svelte';
    import { fetchAllOptionTrades } from '$lib/utils/fetch-trades';

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
        tradeUnsubscribe = OptionTrades.subscribe((value) => {
            console.log('TradeList updated:', value);
            tradeList = value;
            openTrades = tradeList.filter((trade) => trade.status == TradeStatus.OPEN);
            closedTrades = tradeList.filter((trade) => trade.status == TradeStatus.CLOSED);
            if(selectedDate) {
                // filter out open trades up to the selected date
                openTrades = openTrades.filter((trade) => {
                    if(formatDate(new Date(trade.created_at)) == formatDate(selectedDate as Date)) {
                        return true;
                    } else {
                        return (new Date(trade.created_at)) < (selectedDate as Date);
                    }
                });
                // filter out closed trades of the selected date
                closedTrades = closedTrades.filter((trade) => {
                    if(formatDate(new Date(trade.created_at)) == formatDate(selectedDate as Date) ||
                    formatDate(new Date(trade.updated_at)) == formatDate(selectedDate as Date)) {
                        return true;
                    } else {
                        return false;
                    }
                });
            }
            console.log('Open trades:', openTrades);
            console.log('Closed trades:', closedTrades);
            modifierStr = modifier();
        });
    }

    let tradeUnsubscribe: any;
    onMount(() => {
		console.log('TradeList mounted');
        fetchAllOptionTrades().then(trade => {
            console.log('All trades:', trade);
        });
        initialize();
		
	});

    onDestroy(() => {
       return tradeUnsubscribe();
    });

</script>

<svelte:head>
    <title>Trade Records</title>
    <meta name="description" content="Trade Records" /> 
</svelte:head>

<p>You have {openTrades.length} open trade{openTrades.length<=1?'' : 's'} and {closedTrades.length} closed trade{closedTrades.length>=1?'':'s'} created {modifierStr}!</p>
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

<AddTradeButton />

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