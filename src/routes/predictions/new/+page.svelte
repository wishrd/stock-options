<script lang="ts">
  import type { Prediction } from '$lib/models';
  import { predictionsService } from '$lib/services/predictions';
  import { stockOptionsService } from '$lib/services/stockOptions';
  import { goto } from '$app/navigation';

  let price = 0;

  async function createPrediction() {
    if (price <= 0) return;

    const prediction: Omit<Prediction, 'id'> = {
      price
    };

    await predictionsService.createPrediction(prediction);
    goto('/predictions');
  }
</script>

<div class="space-y-6">
  <h1 class="text-2xl font-bold">New Prediction</h1>

  <form on:submit|preventDefault={createPrediction} class="space-y-6">
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
      <p id="price-description" class="text-sm text-gray-500 mt-1">Expected price when selling the stock options</p>
    </div>

    <div class="flex justify-end gap-2">
      <a href="/predictions" class="btn btn-ghost" role="button">Cancel</a>
      <button 
        type="submit" 
        class="btn btn-primary" 
        disabled={price <= 0}
      >
        Create
      </button>
    </div>
  </form>
</div> 