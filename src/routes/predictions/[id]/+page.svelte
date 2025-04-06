<script lang="ts">
  import type { PageProps } from './$types';
  import { predictionsService } from '$lib/services/predictions';
  import PredictionForm from '$lib/components/PredictionForm.svelte';
  import type { Prediction } from '$lib/models';
  import { goto } from '$app/navigation';

  let { data }: PageProps = $props();
  let prediction = data.prediction;

  async function handleSubmit(predictionData: Omit<Prediction, 'id'>) {
    if (!prediction) return;
    await predictionsService.updatePrediction({
      ...predictionData,
      id: prediction.id
    });
    goto('#/predictions');
  }
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <h1 class="text-2xl font-bold">Edit Prediction</h1>
    <button class="btn btn-ghost" on:click={() => goto('/predictions')}>Cancel</button>
  </div>

  {#if prediction}
    <PredictionForm 
      prediction={{ price: prediction.price }}
      onSubmit={handleSubmit}
      isEditing={true}
    />
  {:else}
    <div class="alert alert-error">
      <span>Prediction not found</span>
    </div>
  {/if}
</div> 