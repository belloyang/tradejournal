<script lang="ts">
    import { addTrade } from "$lib/utils/db-api";
    import TradeDetail from "./TradeDetail.svelte";
    import { OptionTrade, TradeStatus, OptionTrades, OptionType, TradeType } from "./optionTrade";
     
    let trades = [];

    function handleSubmit() {
        console.log(`submit trade @${new Date().toDateString()}:`, optionTrade, );
        // Here, you can add your form submission logic, e.g., sending data to a server.
        
        addTrade(optionTrade).then((response) => {
            console.log('Trade added:', response);
        }).catch((error) => {
            console.error('Error adding trade:', error);
        });
        // navigate to trade-list
        window.location.href = '/trade-list';
        
    }
  let optionTrade: OptionTrade = new OptionTrade('', OptionType.CALL, TradeType.BUY,100, '', 1, 1.0, TradeStatus.OPEN);
  </script>
  

  
  <form on:submit|preventDefault={handleSubmit}>
    <TradeDetail {optionTrade} editing={true}/>
    <br/>
    <div class="row">
      <button on:click={() =>window.location.href='/'}>Cancel</button><button type="submit">Submit</button>
    </div>
  </form>

  <style>
    form {
      display: flex;
      flex-direction: column;
      max-width: 500px;
      margin: 0 auto;
    }
    .row {
      display: flex;
      justify-content: center;
    }
  
    button {
      margin: 0.1em;
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