<script lang="ts">
  import type { StockOptionPackage } from '$lib/models';
  import { calculateVestedAmount } from '$lib/utils';
  import { goto } from '$app/navigation';

  export let stockPackage: StockOptionPackage;

  const vestedAmount = calculateVestedAmount(stockPackage);

  function handleClick() {
    goto(`#/package/${stockPackage.id}`);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  }
</script>

<div 
  class="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow" 
  role="button"
  tabindex="0"
  on:click={handleClick}
  on:keydown={handleKeydown}
  aria-label="Package {stockPackage.id} details"
>
  <div class="card-body">
    <h2 class="card-title">Package {stockPackage.id}</h2>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <p class="text-sm text-gray-500">Amount</p>
        <p class="font-semibold">{stockPackage.amount}</p>
      </div>
      <div>
        <p class="text-sm text-gray-500">Price</p>
        <p class="font-semibold">${stockPackage.price.toFixed(2)}</p>
      </div>
      <div>
        <p class="text-sm text-gray-500">Vesting Date</p>
        <p class="font-semibold">{new Date(stockPackage.vestingDate).toLocaleDateString()}</p>
      </div>
      <div>
        <p class="text-sm text-gray-500">Vested Amount</p>
        <p class="font-semibold">{vestedAmount}</p>
      </div>
    </div>
  </div>
</div> 