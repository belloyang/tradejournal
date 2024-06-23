<script lang="ts">
    import Page from "../+page.svelte";
    import TradeDetail from "../trade-detail/TradeDetail.svelte";
    import type { OptionTrade } from "../trade-detail/trade";

    export let show: Boolean = false;
    export let onClose;
    export let onCancel;

    export let optionTrade: OptionTrade;
    let editing = false;

    function save() {
        console.log('Save', optionTrade);
        show = false;
    }

    function handleDetailChange(event: CustomEvent) {
        console.log('HandleDetailChange:', event.detail);
        optionTrade = event.detail;
    
    }
</script>

{#if show} 
    <div class="modal">
        <div class="modal-content">
            <div class="column">
            {#if editing}
                <button class="close" on:click={() => save()}><img src="/save.svg" alt="Save"></button>
            {:else}
                <button class="close" on:click={() => editing = true }><img src="/edit.svg" alt="Editing"></button>
            {/if}
            <br/>
            <TradeDetail {editing} {optionTrade} on:detailChange={handleDetailChange}/>
            <br/>
            <button class="close" on:click={() => show = false} on:keydown={(event) => {if (event.key === 'Enter') show = false;}}>Cancel</button>
            </div>
        </div>
    </div>
{/if}

<style>
    .column {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }   

    .modal {
    display: block;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .modal-content {
    background-color: #fff;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 500px;
  }

  .close {
    color: white;
    float: right;
    font-size: large;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
  img {
        width: 20px;
        height: 20px;
        cursor: pointer;
    }

</style>