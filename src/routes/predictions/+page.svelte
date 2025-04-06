<script lang="ts">
  import type { Prediction, StockOptionPackage } from '$lib/types';
  import { formatCurrency } from '$lib/utils';
  import { stockOptionsService } from '$lib/services/stockOptions';
  import { predictionsService } from '$lib/services/predictions';
  import { onMount } from 'svelte';

  let packages: StockOptionPackage[] = [];
  let predictions: Prediction[] = [];
  let newPrice = 0;

  onMount(async () => {
    packages = await stockOptionsService.getPackages();
    predictions = await predictionsService.getPredictions();
  });

  async function addPrediction() {
    if (newPrice <= 0) return;

    const prediction = await predictionsService.createPrediction(newPrice);
    predictions = [...predictions, prediction];
    newPrice = 0;
  }

  async function deletePrediction(prediction: Prediction) {
    if (confirm('Are you sure you want to delete this prediction?')) {
      await predictionsService.deletePrediction(prediction.id);
      predictions = predictions.filter(p => p.id !== prediction.id);
    }
  }

  function getTotalRevenue(prediction: Prediction): string {
    const totalRevenue = predictionsService.calculateTotalRevenue(prediction, packages);
    return formatCurrency(totalRevenue);
  }

  function getVestedRevenue(prediction: Prediction): string {
    const vestedRevenue = predictionsService.calculateVestedRevenue(prediction, packages);
    return formatCurrency(vestedRevenue);
  }
</script>

<div class="space-y-4">
  <div class="flex justify-between items-center">
    <h1 class="text-2xl font-bold">Predictions</h1>
    <div class="flex gap-2">
      <input
        type="number"
        class="input input-bordered"
        placeholder="Price"
        bind:value={newPrice}
        min="0"
        step="0.01"
      />
      <button class="btn btn-primary" on:click={addPrediction}>Add</button>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each predictions as prediction}
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Price: {formatCurrency(prediction.price)}</h2>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500">Total Revenue</p>
              <p class="font-semibold">{getTotalRevenue(prediction)}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Vested Revenue</p>
              <p class="font-semibold">{getVestedRevenue(prediction)}</p>
            </div>
          </div>
          <div class="card-actions justify-end mt-4">
            <a href="/predictions/{prediction.id}" class="btn btn-primary btn-sm">Details</a>
            <button class="btn btn-error btn-sm" on:click={() => deletePrediction(prediction)}>Delete</button>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div> 