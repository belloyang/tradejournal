<script lang="ts">
    import { OptionTrade, optionTrades } from "./trade";
    let name = '';
    let email = '';
    
    
    function handleSubmit() {
        console.log(`submit trade @${new Date().toDateString()}:`, optionTrade, );
        // Here, you can add your form submission logic, e.g., sending data to a server.
        optionTrades.set([optionTrade]);
    }
$: optionTrades;
  let optionTrade: OptionTrade = new OptionTrade();
  </script>
  

  
  <form on:submit|preventDefault={handleSubmit}>
    <label for="symbol">Symbol</label>
    <input type="text" id="symbol" bind:value={optionTrade.symbol} required />
    <label for="quantity">Quantity</label>
    <div><input type="number" id="quantity" min="0" bind:value={optionTrade.quantity} required /> contract{optionTrade.quantity>1?"s":""}</div>
    <label for="tradeType">Trade Type</label>
    <select id="tradeType" bind:value={optionTrade.tradeType}>
      <option value="Buy">Buy</option>
      <option value="Sell">Sell</option>
    </select>

    <label for="optionType">Option Type</label>
    <select id="optionType" bind:value={optionTrade.optionType}>
      <option value="Call">Call</option>
      <option value="Put">Put</option>
    </select>
    <label for="strikePrice">Strike Price</label>
    <input type="number" id="strikePrice" bind:value={optionTrade.strikePrice} required />
    <label for="expirationDate">Expiration Date</label>
    <input type="date" id="expirationDate" bind:value={optionTrade.expirationDate} required />
    <label for="premium">Premium</label>
    <input type="number" id="premium" bind:value={optionTrade.premium} required />

    <button type="submit">Submit</button>
  </form>


  <style>
    form {
      display: flex;
      flex-direction: column;
      max-width: 300px;
      margin: 0 auto;
    }
    label {
      margin: 10px 0 5px;
    }
    input {
      padding: 8px;
      margin-bottom: 10px;
    }
    button {
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
  </style>