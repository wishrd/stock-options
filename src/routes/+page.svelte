<script lang="ts">
  import StockOptionCard from '$lib/components/StockOptionCard.svelte';
  import { stockOptionsService } from '$lib/services/stockOptions';
  import { onMount } from 'svelte';
  import type { StockOptionPackage } from '$lib/types';

  let packages: StockOptionPackage[] = [];

  onMount(async () => {
    packages = await stockOptionsService.getPackages();
  });
</script>

<div class="space-y-4">
  <div class="flex justify-between items-center">
    <h1 class="text-2xl font-bold">Stock Options Packages</h1>
    <a href="/package/new" class="btn btn-primary">Add New Package</a>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each packages as stockPackage}
      <StockOptionCard stockPackage={stockPackage} />
    {/each}
  </div>
</div>
