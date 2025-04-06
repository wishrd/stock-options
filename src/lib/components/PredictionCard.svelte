<script lang="ts">
  import type { Prediction, StockOptionPackage } from '$lib/models';
  import { formatCurrency } from '$lib/utils';
  import { goto } from '$app/navigation';
  import { RevenueCalculator } from '$lib/services/RevenueCalculator';

  export let prediction: Prediction;
  export let packages: StockOptionPackage[];

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

  function handleEdit() {
    goto(`#/predictions/${prediction.id}`);
  }
</script>

<div 
  class="card bg-base-100 shadow-xl cursor-pointer group" 
  role="button"
  tabindex="0"
  aria-expanded={isExpanded}
  aria-label="Prediction details for price {formatCurrency(prediction.price)}"
  onclick={toggleExpand}
  onkeydown={handleKeydown}
>
  <div class="card-body">
    <div class="flex justify-between items-center">
      <h2 class="card-title">{formatCurrency(prediction.price)}</h2>
      <button 
        class="btn btn-ghost btn-circle text-primary hover:bg-primary hover:text-primary-content" 
        onclick={handleEdit}
        aria-label="Edit prediction"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>
    </div>

    <div class="grid grid-cols-2 gap-4 mt-4">
      <div>
        <p class="text-sm text-gray-500">Total Revenue</p>
        <p class="font-semibold">{formatCurrency(totalRevenue)}</p>
      </div>
      <div>
        <p class="text-sm text-gray-500">Vested Revenue</p>
        <p class="font-semibold">{formatCurrency(vestedRevenue)}</p>
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