<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { OptionType, TradeStatus, TradeType, calcPL, calcPLPercent, type OptionTrade } from "../trade-detail/optionTrade";
    import TradeModal from "./TradeModal.svelte";
    import { deleteTrade, removeTradefromAccount } from "$lib/utils/db-api";
  import { currentAccountStore } from "../account-detail/account";
  import { get } from "svelte/store";

    export let trade: OptionTrade;
   
    $: pl = calcPL(trade);

    $: plPercentage = calcPLPercent(trade);
    function getTradeLabel(trade: OptionTrade) {
        return `${trade.symbol} ${trade.strike} ${trade.optionType} ${trade.expirationDate}`;
    }

    let showModal = false;
    function openModal() {
        showModal = true;
    }
    function closeModal() {
        showModal = false;
    }
    function handleDetailChange(event: CustomEvent) {
        console.log('HandleDetailChange:', event.detail);
        trade = event.detail;
        pl = calcPL(trade);
        plPercentage = calcPLPercent(trade);
        triggerDetailChange();
    }

    const dispatch = createEventDispatcher();
    function triggerDetailChange() {
        console.log('triggerDetailChange', trade);
        const event = new CustomEvent('detailChange', {
            detail: trade
        });
        dispatch('detailChange', trade);
    }
    function triggerTradeDeleted() {
        console.log('triggerTradeDeleted', trade);
        const event = new CustomEvent('tradeDeleted', {
            detail: trade
        });
        dispatch('tradeDeleted', trade);
    }

    let timer: any;
    function handleMouseDown() {
    // Start a timer when the mouse is pressed down
    timer = setTimeout(() => {
      // Show the confirmation dialog after 1 second (1000 ms)
      if (window.confirm(`Do you want to delete the trade "${getTradeLabel(trade)}"?`)) {
        // Perform the action if the user confirms
        // delete the trade
        deleteTrade(trade).then((response) => {
            console.log('Trade deleted:', response);
            removeTradefromAccount(currentAccountStore, trade);
            triggerTradeDeleted();
        }).catch((error) => {
            console.error('Error deleting trade:', error);
        });
        
      } else {
        // Handle the case where the user cancels
        console.log("Delete Canceled!")
      }
    }, 500); // 0.5s
  }

  function handleMouseUp() {
    // Clear the timer if the mouse is released before the timeout
    clearTimeout(timer);
  }

</script>

<!-- display the summary of the trade -->
<div class="container highlight-{pl == 0 ? 'grey': (pl >0 ? 'green':'red')}" style="border-size:1px border-color: {trade.status === TradeStatus.OPEN ? 'orange':'blue'};" 
     role="button" tabindex="0" on:click={openModal} on:keydown={openModal} on:mousedown={handleMouseDown}  on:mouseup={handleMouseUp}> 
     <!--e.g. SPY $100 CALL 20240101 -->
      <label for="symbol" style="font-weight: bold;">{getTradeLabel(trade)}</label>
      <div style="font-size: small;">
          <label for="quantity">Quantity:</label> <span>{trade.quantity}</span>
          <label for="marketValue">Market Value:</label> <span>${trade.marketValue}</span>
          <label for="premium">Premium:</label> <span>${trade.premium}</span>
      </div>
      <div style="font-size: small;">
          <lable for="P/L" style="font-weight: bold;">P/L: ${pl.toFixed(2)}</lable>
          <lable for="P/L Ratio" style="font-weight: bold;">P/L Ratio: {plPercentage.toFixed(2)}%</lable>
      </div>
</div>
<TradeModal optionTrade={trade} on:detailChange={handleDetailChange} show={showModal} onClose={closeModal} />

<style>
    .highlight-green {
        background-color: lightgreen;
    }
    .highlight-red {
        background-color: lightcoral;
    }
    .highlight-grey {
        background-color: lightgrey;
    }
    .container {
        border-radius: 0.5em;
        margin: 0 auto;
        padding: 0.5em;
    }
    .container:hover {
        cursor: pointer;
        background-color: lightblue;
    }
    label {
        margin: 10px 0 5px;
    }
    span {
        padding: 8px;
        margin-bottom: 10px;
    }

</style>