<script lang="ts" >
    import { createEventDispatcher } from "svelte";
    import { OptionTrade, OptionType, TradeStatus, TradeType } from "./optionTrade";

    export let optionTrade: OptionTrade;
    export let editing = false;

    let dispatch = createEventDispatcher();
    function triggerDetailChange() {
        console.log('triggerDetailChange');
        dispatch('detailChange',optionTrade);
    }
</script>

<div>
    
    <div class="row">
    <label for="symbol">Symbol</label>
    {#if editing}
    <input type="text" id="symbol" bind:value={optionTrade.symbol} required on:change={triggerDetailChange}/>
    {:else}
    <span>{optionTrade.symbol}</span>
    {/if}
    </div>
    <div class="row">
    <label for="quantity">Quantity</label>
    {#if editing}
    <span><input type="number" id="quantity" min="0" bind:value={optionTrade.quantity} required on:change={triggerDetailChange}/> contract{optionTrade.quantity>1?"s":""}</span>
    {:else}
    <span>{optionTrade.quantity} contract{optionTrade.quantity>1?"s":""}</span>
    {/if}
    </div>
    <div class="row">
    <label for="tradeType">Trade Type</label>
    {#if editing}
    <select id="tradeType" bind:value={optionTrade.tradeType} on:change={triggerDetailChange}>
      <option value={TradeType.BUY}>Buy</option>
      <option value={TradeType.SELL}>Sell</option>
    </select>
    {:else}
    <span>{optionTrade.tradeType}</span>
    {/if}
    </div>
    <div class="row">
    <label for="optionType">Option Type</label>
    {#if editing}
    <select id="optionType" bind:value={optionTrade.optionType} on:change={triggerDetailChange}>
      <option value={OptionType.CALL}>Call</option>
      <option value={OptionType.PUT}>Put</option>
    </select>
    {:else}
    <span>{optionTrade.optionType}</span>
    {/if}
    </div>
    <div class="row">
    <label for="strike">Strike Price</label>
    {#if editing}
    <span>$<input type="number" id="strike" step="0.5" bind:value={optionTrade.strike} required on:change={triggerDetailChange}/></span>
    {:else}
    <span>${optionTrade.strike}</span>
    {/if}
    </div>
    <div class="row">
    <label for="expirationDate">Expiration Date</label>
    {#if editing}
    <input type="date" id="expirationDate" bind:value={optionTrade.expirationDate} required on:change={triggerDetailChange}/>
    {:else}
    <span>{optionTrade.expirationDate}</span>
    {/if}
    </div>
    <div class="row">
    <label for="premium">Premium</label>
    {#if editing}
    <span>$<input type="number" step="0.01" min=0 id="premium" bind:value={optionTrade.premium} required on:change={triggerDetailChange}/></span>
    {:else}
    <span>${optionTrade.premium}</span>
    {/if}
    </div>
    <div class="row">
    <label for="marketValue">Market Value</label>
    {#if editing}
    <span>$<input type="number" step="0.01" min=0 id="marketValue" bind:value={optionTrade.marketValue} required on:change={triggerDetailChange}/></span>
    {:else}
    <span>${optionTrade.marketValue}</span>
    {/if}
    </div>
    <div class="row">
    <label for="status">Status</label>
    {#if editing}
    <select id="status" bind:value={optionTrade.status} on:change={triggerDetailChange}>
      <option value={TradeStatus.OPEN}>OPEN</option>
      <option value={TradeStatus.CLOSED}>CLOSED</option>
    </select>
    {:else}
    <span>{optionTrade.status}</span>
    {/if}

    </div>
    {#if !editing} 
    <br/>
    <label for="createdDate" style="font-size: small; color:gray">Created at {optionTrade.created_at}</label>
    {/if}
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
    div {
        margin-bottom: 10px;
    }
    
</style>