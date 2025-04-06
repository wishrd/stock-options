<script lang="ts">
  import StockOptionCard from '$lib/components/StockOptionCard.svelte';

  let { data } = $props();
  let packages = data.stockPackages;
</script>

<div class="space-y-4">
  <div class="flex justify-between items-center">
    <h1 class="text-2xl font-bold">Packages</h1>
    <a href="/package/new" class="btn btn-primary">New</a>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each packages as stockPackage}
      <StockOptionCard stockPackage={stockPackage} />
    {/each}
  </div>
</div>
