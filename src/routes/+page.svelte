<script>
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
    import CurrentDate from './CurrentDate.svelte';
    import AddTrade from './trade-detail/AddTrade.svelte';
    import { onMount } from 'svelte';

	onMount(() => {
		console.log('Home mounted');
		fetch('http://localhost:3000/api/option_trades')
			.then(response => response.json())
			.then(data => console.log(data));
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

	<AddTrade />
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
