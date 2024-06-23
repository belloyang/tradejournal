<script lang="ts" >
    import { TradeStatus } from "./trade";

    export let optionTrade;
</script>

<div>
    <div class="row">
    <label for="symbol">Symbol</label>
    <input type="text" id="symbol" bind:value={optionTrade.symbol} required />
    </div>
    <div class="row">
    <label for="quantity">Quantity</label>
    <span><input type="number" id="quantity" min="0" bind:value={optionTrade.quantity} required /> contract{optionTrade.quantity>1?"s":""}</span>
    </div>
    <div class="row">
    <label for="tradeType">Trade Type</label>
    <select id="tradeType" bind:value={optionTrade.tradeType}>
      <option value="Buy">Buy</option>
      <option value="Sell">Sell</option>
    </select>
    </div>
    <div class="row">
    <label for="optionType">Option Type</label>
    <select id="optionType" bind:value={optionTrade.optionType}>
      <option value="Call">Call</option>
      <option value="Put">Put</option>
    </select>
    </div>
    <div class="row">
    <label for="strike">Strike Price</label>
    <span>$<input type="number" id="strike" bind:value={optionTrade.strike} required /></span>
    </div>
    <div class="row">
    <label for="expirationDate">Expiration Date</label>
    <input type="date" id="expirationDate" bind:value={optionTrade.expirationDate} required />
    </div>
    <div class="row">
    <label for="premium">Premium</label>
    <span>$<input type="number" step="0.01" min=0 id="premium" bind:value={optionTrade.premium} required /></span>
    </div>
    <div class="row">
    <label for="marketValue">Market Value</label>
    <span>$<input type="number" step="0.01" min=0 id="marketValue" bind:value={optionTrade.marketValue} required /></span>
    </div>
    <div class="row">
    <label for="status">Status</label>
    <select id="status" bind:value={optionTrade.status}>
      <option value={TradeStatus.OPEN}>OPEN</option>
      <option value={TradeStatus.CLOSED}>CLOSED</option>
    </select>
    </div>
</div>

<style>
    .row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    label {
        margin: 10px 0 5px;
    }
    input {
        padding: 8px;
        margin-bottom: 10px;
    }
    select {
        padding: 8px;
        margin-bottom: 10px;
    }
    button {
        padding: 10px;
    }
    div {
        margin-bottom: 10px;
    }
</style>