<script lang="ts">
  import type { StockOptionPackage, VestingStrategy } from '$lib/types';
  import { stockOptionsService } from '$lib/services/stockOptions';

  const vestingStrategies: { value: VestingStrategy; label: string }[] = [
    { value: 'quarterly', label: '1/4 after 1 year, then 1/48 monthly' },
    { value: 'six_months', label: '100% after 6 months' },
    { value: 'twelve_months', label: '100% after 12 months' }
  ];

  let stockPackage: Omit<StockOptionPackage, 'id'> = {
    amount: 0,
    price: 0,
    vestingDate: new Date().toISOString().split('T')[0],
    vestingStrategy: 'quarterly'
  };

  async function createPackage() {
    await stockOptionsService.createPackage(stockPackage);
    window.history.back();
  }
</script>

<div class="max-w-2xl mx-auto space-y-4">
  <h1 class="text-2xl font-bold">New Package</h1>

  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Amount</span>
        </label>
        <input
          type="number"
          class="input input-bordered"
          bind:value={stockPackage.amount}
          min="0"
        />
      </div>

      <div class="form-control">
        <label class="label">
          <span class="label-text">Price</span>
        </label>
        <input
          type="number"
          class="input input-bordered"
          bind:value={stockPackage.price}
          min="0"
          step="0.01"
        />
      </div>

      <div class="form-control">
        <label class="label">
          <span class="label-text">Vesting Date</span>
        </label>
        <input
          type="date"
          class="input input-bordered"
          bind:value={stockPackage.vestingDate}
        />
      </div>

      <div class="form-control">
        <label class="label">
          <span class="label-text">Vesting Strategy</span>
        </label>
        <select class="select select-bordered" bind:value={stockPackage.vestingStrategy}>
          {#each vestingStrategies as strategy}
            <option value={strategy.value}>{strategy.label}</option>
          {/each}
        </select>
      </div>

      <div class="card-actions justify-end mt-4">
        <button class="btn btn-ghost" on:click={() => window.history.back()}>Cancel</button>
        <button class="btn btn-primary" on:click={createPackage}>Create</button>
      </div>
    </div>
  </div>
</div> 