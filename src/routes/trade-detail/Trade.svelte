<script lang="ts">
    import { DB_HOST, DB_PORT } from "$lib/utils/db-host";
    import { fetchAllOptionTrades } from "$lib/utils/fetch-trades";
    import TradeDetail from "./TradeDetail.svelte";
    import { OptionTrade, TradeStatus, OptionTrades } from "./trade";
     
    let trades = [];
    async function addTrade(trade: OptionTrade) {
    const response = await fetch(`${DB_HOST}:${DB_PORT}/api/option_trades`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...trade, created_at: new Date(), updated_at: new Date()})
    });
    const newTrade = await response.json();

    console.log('Trade added:', newTrade);
   
   }

    function handleSubmit() {
        console.log(`submit trade @${new Date().toDateString()}:`, optionTrade, );
        // Here, you can add your form submission logic, e.g., sending data to a server.
        
        addTrade(optionTrade);
        // navigate to trade-list
        window.location.href = '/trade-list';
        
    }
  let optionTrade: OptionTrade = new OptionTrade();
  </script>
  

  
  <form on:submit|preventDefault={handleSubmit}>
    <TradeDetail {optionTrade} />
    
    <br/>
    <button type="submit">Submit</button>
  </form>

  <style>
    form {
      display: flex;
      flex-direction: column;
      max-width: 500px;
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