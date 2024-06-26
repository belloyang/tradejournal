<script lang="ts">
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
    import CurrentDate from './CurrentDate.svelte';
    import AddTradeButton from './trade-detail/AddTradeButton.svelte';
    import { onMount } from 'svelte';
    import { fetchAllOptionTrades } from '$lib/utils/db-api';
	let allOptionTrades = [];
	onMount(() => {
		console.log('Home mounted');
		fetchAllOptionTrades().then((trades) => {
			allOptionTrades = trades;
			console.log('All trades:', allOptionTrades);
		});
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="TradeJournal" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</span>

		to <br />TradeJournal App
		<br />
	</h1>
	<CurrentDate />

	<AddTradeButton />
</section>


<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
