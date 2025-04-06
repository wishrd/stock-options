<script lang="ts">
  import PredictionCard from '$lib/components/PredictionCard.svelte';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  let predictions = data.predictions;
  let packages = data.packages;
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <h1 class="text-2xl font-bold">Predictions</h1>
    <a href="#/predictions/new" class="btn btn-primary">New</a>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each predictions as prediction (prediction.id)}
      <PredictionCard 
        {prediction} 
        {packages}
      />
    {/each}
  </div>
</div> 