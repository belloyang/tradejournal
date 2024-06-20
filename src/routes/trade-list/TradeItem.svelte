<script lang="ts">
    import { TradeStatus, type OptionTrade } from "../trade-detail/trade";

    export let trade: OptionTrade;
    function calculatePL() {
        return (trade.marketValue - trade.premium)*100;
    }
    function calculatePLPercentage() {
        return (trade.marketValue - trade.premium)*100 / trade.premium;
    }

</script>

<!-- display the summary of the trade -->
<div class="container highlight-{calculatePL() >0 ? 'green':'blue'}" style="border-style: dotted; border-color: {trade.status === TradeStatus.OPEN ? 'orange':'blue'};"> 
    <!--e.g. SPY $100 CALL 20240101 -->
     <label for="symbol" style="font-weight: bold;">{trade.symbol} ${trade.strike} {trade.optionType} {trade.expirationDate}</label>
     <div style="font-size: small;">
        <label for="quantity">Quantity:</label> <span>{trade.quantity}</span>
        <label for="marketValue">Market Value:</label> <span>${trade.marketValue}</span>
        <label for="premium">Premium:</label> <span>${trade.premium}</span>
     </div>
     <div style="font-size: small;">
        <lable for="P/L">P/L: ${calculatePL().toFixed(2)}</lable>
        <lable for="P/L Ratio">P/L: {calculatePLPercentage().toFixed(2)}%</lable>
     </div>
</div>

<style>
    .highlight-green {
        background-color: lightgreen;
    }
    .highlight-red {
        background-color: lightcoral;
    }
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