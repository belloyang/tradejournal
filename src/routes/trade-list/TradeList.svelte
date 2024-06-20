<script lang="ts">
    import { onDestroy, onMount } from 'svelte';
    import { OptionTrade } from '../trade-detail/trade'
    import AddTrade from '../trade-detail/AddTrade.svelte';
    import { DB_HOST, DB_PORT } from '../../lib/utils/db-host';
    import TradeItem from './TradeItem.svelte';

    export let selectedDate: Date| undefined = undefined;
    let tradeList: OptionTrade[] = [];
  
    let modifierStr: string = '';
    $: selectedDateChanged(selectedDate);

    function selectedDateChanged(updatedDate: Date|undefined) {
        console.log('Selected date changed:', updatedDate);
        selectedDate = updatedDate;
        initialize();
    }


    function modifier(): string {
        console.log("modifier", selectedDate);
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
        let apiURL = `${DB_HOST}:${DB_PORT}/api/option_trades`;
        if(selectedDate !== undefined) {
            apiURL = `${DB_HOST}:${DB_PORT}/api/option_trades?created_at=${formatDate(selectedDate)}`;
        }
        console.log('API URL:', apiURL);
        fetch(apiURL).then(response => response.json())
            .then(obj => {
                tradeList = [...obj.data];
                console.log("Trades of the day:", tradeList, selectedDate && selectedDate.toDateString());
            });
        modifierStr = modifier();
    }

    onMount(() => {
		console.log('TradeList mounted');
        initialize();
		
	});

    onDestroy(() => {
       
    });

</script>

<svelte:head>
    <title>Trade Records</title>
    <meta name="description" content="Trade Records" /> 
</svelte:head>

<p>You have {tradeList.length} trade{tradeList.length<=1?'' : 's'} created {modifierStr}!</p>
<ul>
    {#each tradeList as trade}
        <li>
           <TradeItem trade={trade}/>
        </li>
    {/each}
</ul>
<AddTrade />

<style>
    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        border: 1px solid black;
        margin: 5px;
        padding: 5px;
    }
</style>