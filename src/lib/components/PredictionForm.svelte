<script lang="ts">
  import type { Prediction } from '$lib/models';

  export let id: string;
  export let prediction: Omit<Prediction, 'id'> = {
    price: 0
  };
  export let onSubmit: (prediction: Omit<Prediction, 'id'>) => void;

  function handleSubmit() {
    if (prediction.price <= 0) return;
    onSubmit(prediction);
  }
</script>

<form id={id} on:submit|preventDefault={handleSubmit} class="space-y-6">
  <div class="space-y-2">
    <label for="price" class="block text-sm font-medium">
      Price
    </label>
    <input
      type="number"
      id="price"
      class="input input-bordered w-full"
      bind:value={prediction.price}
      min="0"
      step="0.01"
      required
      aria-required="true"
      aria-describedby="price-description"
    />
    <p id="price-description" class="text-sm text-gray-500 mt-1">Predicted stock price</p>
  </div>
</form> 