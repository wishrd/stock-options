<script lang="ts">
  import type { StockOptionPackage } from '$lib/types';
  import { calculateVestedAmount } from '$lib/utils';

  export let stockPackage: StockOptionPackage;

  const vestedAmount = calculateVestedAmount(stockPackage);
</script>

<div class="card bg-base-100 shadow-xl">
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
    <div class="card-actions justify-end mt-4">
      <a href="/package/{stockPackage.id}" class="btn btn-primary btn-sm">Edit</a>
    </div>
  </div>
</div> 