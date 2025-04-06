<script lang="ts">
  import type { PageData } from './$types';
  import { predictionsService } from '$lib/services/predictions';
  import { RevenueCalculator } from '$lib/services/RevenueCalculator';

  export let data: PageData;
  let { predictions, packages } = data;

  const revenueCalculator = new RevenueCalculator();

  async function deletePrediction(id: string) {
    await predictionsService.deletePrediction(id);
    predictions = predictions.filter(p => p.id !== id);
  }

  function getTotalRevenue(prediction: typeof predictions[0]) {
    return revenueCalculator.calculateTotalRevenue(prediction, packages);
  }

  function getVestedRevenue(prediction: typeof predictions[0]) {
    return revenueCalculator.calculateVestedRevenue(prediction, packages);
  }
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <h1 class="text-2xl font-bold">Predictions</h1>
    <a href="/predictions/new" class="btn btn-primary">New Prediction</a>
  </div>

  <div class="space-y-4">
    {#each predictions as prediction (prediction.id)}
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <div class="flex justify-between items-start">
            <div>
              <h2 class="card-title">Price: ${prediction.price.toFixed(2)}</h2>
              <div class="mt-2 space-y-1">
                <p>Total Revenue: ${getTotalRevenue(prediction).toFixed(2)}</p>
                <p>Vested Revenue: ${getVestedRevenue(prediction).toFixed(2)}</p>
              </div>
            </div>
            <button
              class="btn btn-ghost btn-sm"
              on:click={() => deletePrediction(prediction.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div> 