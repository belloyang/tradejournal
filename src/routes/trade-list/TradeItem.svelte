<script lang="ts">
    import { TradeStatus, type OptionTrade } from "../trade-detail/trade";

    export let trade: OptionTrade;

</script>

<!-- display the summary of the trade -->
<div class=container style="background-color: {trade.status === TradeStatus.OPEN ? 'lightgreen':'lightgrey'};"> 
    <!--e.g. SPY $100 CALL 20240101 -->
     <label for="symbol" style="font-weight: bold;">{trade.symbol} ${trade.strike} {trade.optionType} {trade.expirationDate}</label>
     <div>
        <label for="quantity">Quantity:</label> <span>{trade.quantity}</span>
        <label for="marketValue">Market Value:</label> <span>${trade.marketValue}</span>
        <label for="premium">Premium:</label> <span>${trade.premium}</span>
     </div>
</div>

<style>
    .container {
        
        margin: 0 auto;
    }
    label {
        margin: 10px 0 5px;
    }
    span {
        padding: 8px;
        margin-bottom: 10px;
    }

</style>