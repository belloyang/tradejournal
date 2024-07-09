<script lang="ts">
    import { createEventDispatcher } from "svelte";
    
    import TradeDetail from "../trade-detail/TradeDetail.svelte";
    import type { OptionTrade } from "../trade-detail/optionTrade";
    import { updateTrade } from "$lib/utils/db-api";
  import { get } from "svelte/store";
  import { currentAccountStore } from "../account-detail/account";

    export let show: Boolean = false;
    export let onClose: any;

    export let optionTrade: OptionTrade;
    
    const originalTrade = optionTrade;

    let editing = false;

    function save() {
        console.log('Saving', optionTrade);
        const trade_id = (optionTrade as any).id;
        if(trade_id === undefined) {
            console.error('Trade ID is not defined:', optionTrade);
            return;
        }
        onClose();
        editing = false;
        
        updateTrade(optionTrade).then((response) => {
            console.log('Trade saved:', response);
            triggerDetailChange();
        }).catch((error) => {
            console.error('Error saving trade:', error);
        });
    }
    function cancel() {
        console.log('Cancel Editing');
        onClose();
        editing = false;
        optionTrade = originalTrade;
    }

    function handleDetailChange(event: CustomEvent) {
        console.log('HandleDetailChange:', event.detail);
        optionTrade = event.detail;
    
    }
    const dispatch = createEventDispatcher();
    function triggerDetailChange() {
        console.log('triggerDetailChange');
        const event = new CustomEvent('detailChange', {
            detail: optionTrade
        });
        dispatch('detailChange',optionTrade);
    }   
</script>

{#if show} 
    <div class="modal">
        <div class="modal-content">
            <div class="column">
            {#if editing}
                <button class="close" on:click={save}><img src="/save.svg" alt="Save"></button>
            {:else}
                <button class="close" on:click={() => editing = true }><img src="/edit.svg" alt="Editing"></button>
            {/if}
            <br/>
            <TradeDetail {editing} {optionTrade} on:detailChange={handleDetailChange}/>
            <br/>
            <button class="close" on:click={cancel} on:keydown={cancel}>Cancel</button>
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