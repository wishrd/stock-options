<script lang="ts">
  import type { StockOptionPackage, VestingStrategy } from '$lib/models';
  import { stockOptionsService } from '$lib/services/stockOptions';
  import { goto } from '$app/navigation';

  let id = '';
  let amount = 0;
  let price = 0;
  let vestingDate = '';
  let vestingStrategy: VestingStrategy = 'linear';

  async function createPackage() {
    if (!id || amount <= 0 || price <= 0 || !vestingDate) return;

    const pkg: Omit<StockOptionPackage, 'id'> = {
      amount,
      price,
      vestingDate,
      vestingStrategy
    };

    await stockOptionsService.createPackage(pkg);
    goto('/');
  }
</script>

<div class="space-y-6">
  <h1 class="text-2xl font-bold">New Stock Options Package</h1>

  <form on:submit|preventDefault={createPackage} class="space-y-6">
    <div class="space-y-2">
      <label for="id" class="block text-sm font-medium">
        Package ID
      </label>
      <input
        type="text"
        id="id"
        class="input input-bordered w-full"
        bind:value={id}
        required
        aria-required="true"
        aria-describedby="id-description"
      />
      <p id="id-description" class="text-sm text-gray-500 mt-1">Unique identifier for the package</p>
    </div>

    <div class="space-y-2">
      <label for="amount" class="block text-sm font-medium">
        Amount
      </label>
      <input
        type="number"
        id="amount"
        class="input input-bordered w-full"
        bind:value={amount}
        min="0"
        step="1"
        required
        aria-required="true"
        aria-describedby="amount-description"
      />
      <p id="amount-description" class="text-sm text-gray-500 mt-1">Number of stock options</p>
    </div>

    <div class="space-y-2">
      <label for="price" class="block text-sm font-medium">
        Price
      </label>
      <input
        type="number"
        id="price"
        class="input input-bordered w-full"
        bind:value={price}
        min="0"
        step="0.01"
        required
        aria-required="true"
        aria-describedby="price-description"
      />
      <p id="price-description" class="text-sm text-gray-500 mt-1">Price per stock option</p>
    </div>

    <div class="space-y-2">
      <label for="vestingDate" class="block text-sm font-medium">
        Vesting Date
      </label>
      <input
        type="date"
        id="vestingDate"
        class="input input-bordered w-full"
        bind:value={vestingDate}
        required
        aria-required="true"
        aria-describedby="vesting-date-description"
      />
      <p id="vesting-date-description" class="text-sm text-gray-500 mt-1">Date when vesting starts</p>
    </div>

    <div class="space-y-2">
      <label for="vestingStrategy" class="block text-sm font-medium">
        Vesting Strategy
      </label>
      <select
        id="vestingStrategy"
        class="select select-bordered w-full"
        bind:value={vestingStrategy}
        aria-describedby="vesting-strategy-description"
      >
        <option value="linear">Linear (1/4 after 1 year, then 1/48 monthly)</option>
        <option value="cliff">Cliff (100% after 6 months)</option>
        <option value="year">Year (100% after 12 months)</option>
      </select>
      <p id="vesting-strategy-description" class="text-sm text-gray-500 mt-1">How the stock options will vest over time</p>
    </div>

    <div class="flex justify-end gap-2">
      <a href="/" class="btn btn-ghost" role="button">Cancel</a>
      <button type="submit" class="btn btn-primary" disabled={!id || amount <= 0 || price <= 0 || !vestingDate}>
        Create
      </button>
    </div>
  </form>
</div> 