<script lang="ts">
    import { onDestroy, onMount } from 'svelte';
    import { OptionTrade, TradeStatus, OptionTrades, TradeType } from '../trade-detail/trade'
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
        if(tradeUnsubscribe) {// unsubscribe if there is any
            tradeUnsubscribe();
        }
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
            // update PL and number of winning trades
            realizedPL = calcRealizedPL();
            unrealizedPL = calcUnrealizedPL();
            nWiningTrades = getNumOfWinningTrades();
            
            modifierStr = modifier();
        });
    }

    function calcPL(trade: OptionTrade) {
        return (trade.marketValue - trade.premium) * trade.quantity * (trade.tradeType == TradeType.BUY ? 1 : -1) * 100;
    }

    function calcRealizedPL() {
        let realizedPL = 0;
        closedTrades.forEach((trade) => {
            realizedPL += calcPL(trade);
        });
        return realizedPL;
    }
    $: realizedPL = calcRealizedPL();

    function calcUnrealizedPL() {
        let unrealizedPL = 0;
        openTrades.forEach((trade) => {
            unrealizedPL += calcPL(trade);
        });
        return unrealizedPL;
    }
    $: unrealizedPL = calcUnrealizedPL();

    function getNumOfWinningTrades() {
        let numOfWinningTrades = 0;
        closedTrades.forEach((trade) => {
            if(calcPL(trade) > 0) {
                numOfWinningTrades++;
            }
        });
        return numOfWinningTrades;
    }
    $: nWiningTrades = getNumOfWinningTrades();
    function handleDetailChange(event: CustomEvent) {
        console.log('HandleDetailChange:', event.detail);
        const updatedTrade = event.detail;
        const index = tradeList.findIndex((trade: any) => trade.id == updatedTrade.id);
        tradeList[index] = updatedTrade;
        OptionTrades.set(tradeList);
        
    }
    function handleTradeDeleted(event: CustomEvent) {
        console.log('HandleTradeDeleted:', event.detail);
        const deletedTrade = event.detail;
        const index = tradeList.findIndex((trade: any) => trade.id == deletedTrade.id);
        tradeList.splice(index, 1);
        OptionTrades.set(tradeList);
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
              <TradeItem {trade} on:detailChange={handleDetailChange} on:tradeDeleted={handleTradeDeleted}/>
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
              <TradeItem {trade} on:detailChange={handleDetailChange} on:tradeDeleted={handleTradeDeleted}/>
            </li>   
          {/each}
        {:else}
          <li class="no-trades">No closed trades</li>
        {/if}
      </ul>
    </div>
  </div>
{/if}
<div>You have {nWiningTrades} winning trade{nWiningTrades <= 1 ?'':'s'} out of {closedTrades.length} closed trades {modifierStr}</div>
<div>
    <div class="{realizedPL>=0?'green':'red'}-dot"></div><label for="realized-pl">Realized P/L: ${realizedPL.toFixed(2)}</label>
</div>
<div>
    <div class="{unrealizedPL>=0?'green':'red'}-dot"></div><label for="realized-pl">Unrealized P/L: ${unrealizedPL.toFixed(2)}</label>
</div>
<br/>
<AddTradeButton />

<style>
    .red-dot {
      margin: 0.2em;
      width: 10px; /* width of the dot */
      height: 10px; /* height of the dot */
      background-color: red; /* color of the dot */
      border-radius: 50%; /* make it a circle */
      display: inline-block; /* make it inline for better positioning */
    }
    .green-dot {
      margin: 0.2em;
      width: 10px; /* width of the dot */
      height: 10px; /* height of the dot */
      background-color: green; /* color of the dot */
      border-radius: 50%; /* make it a circle */
      display: inline-block; /* make it inline for better positioning */
    }
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