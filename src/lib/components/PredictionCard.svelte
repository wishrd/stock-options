<script lang="ts">
  import type { Prediction, StockOptionPackage } from '$lib/models';
  import { formatCurrency } from '$lib/utils';
  import { goto } from '$app/navigation';
  import { RevenueCalculator } from '$lib/services/RevenueCalculator';

  export let prediction: Prediction;
  export let packages: StockOptionPackage[];
  export let onDelete: (id: string) => Promise<void>;

  const revenueCalculator = new RevenueCalculator();
  let isExpanded = false;

  $: totalRevenue = revenueCalculator.calculateTotalRevenue(prediction, packages);
  $: vestedRevenue = revenueCalculator.calculateVestedRevenue(prediction, packages);
  $: packageRevenues = packages.map(pkg => ({
    package: pkg,
    total: revenueCalculator.calculatePackageRevenue(pkg, prediction.price),
    vested: revenueCalculator.calculatePackageVestedRevenue(pkg, prediction.price)
  }));

  function toggleExpand(event: MouseEvent | KeyboardEvent) {
    // Don't toggle if clicking on buttons
    if ((event.target as HTMLElement).closest('button')) return;
    isExpanded = !isExpanded;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleExpand(event);
    }
  }
</script>

<div 
  class="card bg-base-100 shadow-xl cursor-pointer group" 
  role="button"
  tabindex="0"
  aria-expanded={isExpanded}
  aria-label="Prediction details for price {formatCurrency(prediction.price)}"
  on:click={toggleExpand}
  on:keydown={handleKeydown}
>
  <div class="card-body">
    <div class="flex justify-between items-start">
      <div class="flex items-center gap-2">
        <h2 class="card-title">Price: {formatCurrency(prediction.price)}</h2>
        <span 
          class="text-gray-500 transition-transform duration-200 group-hover:text-gray-700"
          class:rotate-180={isExpanded}
          aria-hidden="true"
        >
          ▼
        </span>
      </div>
      <div class="flex gap-2">
        <button 
          class="btn btn-ghost btn-sm" 
          on:click={() => goto(`/predictions/${prediction.id}`)}
          aria-label="Edit prediction"
        >
          Edit
        </button>
        <button 
          class="btn btn-error btn-sm" 
          on:click={() => onDelete(prediction.id)}
          aria-label="Delete prediction"
        >
          Delete
        </button>
      </div>
    </div>
    <div class="grid grid-cols-1 gap-2 mt-4">
      <div class="flex justify-between items-center">
        <span class="text-sm font-medium">Total Revenue</span>
        <span class="text-lg font-semibold">{formatCurrency(totalRevenue)}</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-sm font-medium">Vested Revenue</span>
        <span class="text-lg font-semibold">{formatCurrency(vestedRevenue)}</span>
      </div>
    </div>

    {#if isExpanded}
      <div class="divider my-2" role="separator"></div>
      <div class="space-y-4" role="list">
        {#each packageRevenues as { package: pkg, total, vested }}
          <div class="grid grid-cols-1 gap-2" role="listitem">
            <div class="flex justify-between items-center">
              <span class="text-sm font-medium">{pkg.id}</span>
              <span class="text-sm">{formatCurrency(total)}</span>
            </div>
            <div class="flex justify-between items-center pl-4">
              <span class="text-sm text-gray-500">Vested</span>
              <span class="text-sm">{formatCurrency(vested)}</span>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div> 