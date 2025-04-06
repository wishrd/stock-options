<script lang="ts">
  import type { StockOptionPackage, VestingStrategy } from '$lib/types';
  import { stockOptionsService } from '$lib/services/stockOptions';

  let stockPackage: Omit<StockOptionPackage, 'id'> = {
    amount: 0,
    price: 0,
    vestingDate: new Date().toISOString().split('T')[0],
    vestingStrategy: 'linear'
  };
  let id = '';

  const vestingStrategies: { value: VestingStrategy; label: string }[] = [
    { value: 'linear', label: 'Linear (1/4 after 1 year, then 1/48 monthly)' },
    { value: 'cliff', label: 'Cliff (100% after 6 months)' },
    { value: 'year', label: 'Year (100% after 12 months)' }
  ];

  async function createPackage() {
    if (!id) {
      alert('Please enter a package ID');
      return;
    }

    const newPackage: StockOptionPackage = {
      id,
      ...stockPackage
    };

    await stockOptionsService.createPackage(newPackage);
    window.history.back();
  }
</script>

<div class="max-w-4xl mx-auto space-y-4">
  <div class="flex justify-between items-center">
    <h1 class="text-2xl font-bold">New Package</h1>
    <button class="btn btn-ghost" on:click={() => window.history.back()}>Cancel</button>
  </div>

  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Package ID</span>
        </label>
        <input
          type="text"
          class="input input-bordered"
          bind:value={id}
          placeholder="Enter package ID"
        />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Amount</span>
        </label>
        <input
          type="number"
          class="input input-bordered"
          bind:value={stockPackage.amount}
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
      <div class="card-actions justify-end">
        <button class="btn btn-primary" on:click={createPackage}>Create</button>
      </div>
    </div>
  </div>
</div> 