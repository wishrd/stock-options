<script lang="ts">
  import type { PageProps } from './$types';
  import { stockOptionsService } from '$lib/services/stockOptions';
  import PackageForm from '$lib/components/PackageForm.svelte';
  import type { StockOptionPackage } from '$lib/models';
  import { goto } from '$app/navigation';

  let { data }: PageProps = $props();
  let stockPackage = data.stockPackage;

  async function handleSubmit(stockPackage: StockOptionPackage) {
    await stockOptionsService.updatePackage(stockPackage);
    goto('/');
  }
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <h1 class="text-2xl font-bold">Edit Package</h1>
    <button class="btn btn-ghost" on:click={() => goto('/')}>Cancel</button>
  </div>

  {#if stockPackage}
    <PackageForm 
      stockPackage={stockPackage} 
      onSubmit={handleSubmit}
      isEditing={true}
    />
  {:else}
    <div class="alert alert-error">
      <span>Package not found</span>
    </div>
  {/if}
</div> 