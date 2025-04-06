<script lang="ts">
  import PredictionForm from '$lib/components/PredictionForm.svelte';
  import { predictionsService } from '$lib/services/predictions';
  import { goto } from '$app/navigation';
  import type { Prediction } from '$lib/models';

  async function handleSubmit(prediction: Omit<Prediction, 'id'>) {
    await predictionsService.createPrediction(prediction);
    goto('#/predictions');
  }
</script>

<div class="space-y-6">
  <h1 class="text-2xl font-bold">New Prediction</h1>
  <PredictionForm onSubmit={handleSubmit} />
</div> 