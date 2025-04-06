<script lang="ts">
  import { predictionsService } from '$lib/services/predictions';
  import PredictionCard from '$lib/components/PredictionCard.svelte';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  let predictions = data.predictions;
  let packages = data.packages;

  async function deletePrediction(id: string): Promise<void> {
    if (confirm('Are you sure you want to delete this prediction?')) {
      await predictionsService.deletePrediction(id);
      predictions = predictions.filter(p => p.id !== id);
    }
  }
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <h1 class="text-2xl font-bold">Predictions</h1>
    <a href="/predictions/new" class="btn btn-primary">New</a>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each predictions as prediction (prediction.id)}
      <PredictionCard 
        {prediction} 
        {packages}
        onDelete={deletePrediction}
      />
    {/each}
  </div>
</div> 