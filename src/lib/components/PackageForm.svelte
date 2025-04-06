<script lang="ts">
  import type { StockOptionPackage, VestingStrategy } from '$lib/models';

  export let stockPackage: StockOptionPackage = {
    id: '',
    amount: 0,
    price: 0,
    vestingDate: '',
    vestingStrategy: 'linear'
  };
  export let onSubmit: (stockPackage: StockOptionPackage) => void;
  export let isEditing = false;

  const vestingStrategies: { value: VestingStrategy; label: string }[] = [
    { value: 'linear', label: 'Linear (1/4 after 1 year, then 1/48 monthly)' },
    { value: 'cliff', label: 'Cliff (100% after 6 months)' },
    { value: 'year', label: 'Year (100% after 12 months)' }
  ];

  function handleSubmit() {
    if (!stockPackage.id || stockPackage.amount <= 0 || stockPackage.price <= 0 || !stockPackage.vestingDate) return;
    onSubmit(stockPackage);
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-6">
  <div class="space-y-2">
    <label for="id" class="block text-sm font-medium">
      Package ID
    </label>
    <input
      type="text"
      id="id"
      class="input input-bordered w-full"
      bind:value={stockPackage.id}
      required
      aria-required="true"
      aria-describedby="id-description"
      disabled={isEditing}
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
      bind:value={stockPackage.amount}
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
      bind:value={stockPackage.price}
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
      bind:value={stockPackage.vestingDate}
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
      bind:value={stockPackage.vestingStrategy}
      aria-describedby="vesting-strategy-description"
    >
      {#each vestingStrategies as strategy}
        <option value={strategy.value}>{strategy.label}</option>
      {/each}
    </select>
    <p id="vesting-strategy-description" class="text-sm text-gray-500 mt-1">How the stock options will vest over time</p>
  </div>

  <div class="flex justify-end gap-2">
    <a href="#" class="btn btn-ghost" role="button">Cancel</a>
    <button 
      type="submit" 
      class="btn btn-primary" 
      disabled={!stockPackage.id || stockPackage.amount <= 0 || stockPackage.price <= 0 || !stockPackage.vestingDate}
    >
      {isEditing ? 'Save' : 'Create'}
    </button>
  </div>
</form> 