<script>
    import { onMount } from "svelte";
    import TradeList from "../trade-list/TradeList.svelte";
    import { DB_HOST, DB_PORT } from '../../lib/utils/db-host';

    let tradeList = [];
    onMount(() => {
        console.log('Trade summary mounted');

    });

</script>
<svelte:head>
	<title>Trade summary Today</title>
	<meta name="description" content="Trade summary today" />
</svelte:head>

<div>
    <h1>Trade summary Today</h1>
    <p>
        This is a summary of your trades today.
    </p>
   
    <TradeList selectedDate = {new Date()}/>
</div>