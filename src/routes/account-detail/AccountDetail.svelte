<script lang="ts">
    import '$lib/shared.css';
    export let account = {
        name: 'Account 1',
        cash: 10000,
        asset: 0
    };
</script>

<div class="column">
    
    <label for="accountName">Account Name</label>
    <input type="text" id="accountName" bind:value={account.name} required />
    <label for='cash'>Cash/Buying Power</label>
    <input type='number' id='cash' step="0.01" bind:value={account.cash} />
    <label for='asset'>Asset</label>
    <input type='number' id='asset' step="0.01" bind:value={account.asset} />
</div>