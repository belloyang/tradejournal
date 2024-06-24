<script lang="ts">
    import { TradeStatus, type OptionTrade } from "../trade-detail/trade";
    import TradeModal from "./TradeModal.svelte";

    export let trade: OptionTrade;
    function calculatePL() {
        return (trade.marketValue - trade.premium)*100;
    }
    function calculatePLPercentage() {
        return (trade.marketValue - trade.premium)*100 / trade.premium;
    }
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
</script>

<!-- display the summary of the trade -->
<div class="container highlight-{calculatePL() >= 0 ? 'green':'red'}" style="border-size:1px border-color: {trade.status === TradeStatus.OPEN ? 'orange':'blue'};" 
     role="button" tabindex="0" on:click={openModal} on:keydown={openModal}> 
     <!--e.g. SPY $100 CALL 20240101 -->
      <label for="symbol" style="font-weight: bold;">{getTradeLabel(trade)}</label>
      <div style="font-size: small;">
          <label for="quantity">Quantity:</label> <span>{trade.quantity}</span>
          <label for="marketValue">Market Value:</label> <span>${trade.marketValue}</span>
          <label for="premium">Premium:</label> <span>${trade.premium}</span>
      </div>
      <div style="font-size: small;">
          <lable for="P/L" style="font-weight: bold;">P/L: ${calculatePL().toFixed(2)}</lable>
          <lable for="P/L Ratio" style="font-weight: bold;">P/L Ratio: {calculatePLPercentage().toFixed(2)}%</lable>
      </div>
</div>
<TradeModal optionTrade={trade} show={showModal} onClose={closeModal} />

<style>
    .highlight-green {
        background-color: lightgreen;
    }
    .highlight-red {
        background-color: lightcoral;
    }
    .container {
        border-radius: 0.5em;
        margin: 0 auto;
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