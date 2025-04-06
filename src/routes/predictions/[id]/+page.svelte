<script lang="ts">
  import type { PageProps } from './$types';
  import { predictionsService } from '$lib/services/predictions';
  import PredictionForm from '$lib/components/PredictionForm.svelte';
  import type { Prediction } from '$lib/models';
  import { goto } from '$app/navigation';

  let { data }: PageProps = $props();
  let prediction = data.prediction;

  const id = 'prediction-form';

  async function handleSubmit(prediction: Omit<Prediction, 'id'>) {
    if (!data.prediction) return;
    await predictionsService.updatePrediction({
      ...prediction,
      id: data.prediction.id
    });
    goto('#/predictions');
  }

  async function handleDelete() {
    if (!prediction) return;
    if (confirm('Are you sure you want to delete this prediction?')) {
      await predictionsService.deletePrediction(prediction.id);
      goto('#/predictions');
    }
  }
</script>

<div class="flex flex-col h-full">
  <div class="sticky top-0 z-10 bg-base-200">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Edit Prediction</h1>
      <button 
        class="btn btn-ghost btn-circle text-error hover:bg-error hover:text-error-content" 
        onclick={handleDelete}
        aria-label="Delete prediction"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  </div>

  <div class="flex-1 overflow-y-auto py-6 pb-24">
    {#if prediction}
      <PredictionForm 
        id={id}
        prediction={prediction} 
        onSubmit={handleSubmit}
      />
    {:else}
      <div class="alert alert-error">
        <span>Prediction not found</span>
      </div>
    {/if}
  </div>

  <div class="fixed bottom-0 left-0 right-0 bg-base-100 border-t border-base-300 py-4 px-4">
    <div class="flex justify-end gap-4">
      <a href="#/predictions" class="btn btn-ghost">Cancel</a>
      <button 
        type="submit" 
        form={id} 
        class="btn btn-primary"
      >
        Save
      </button>
    </div>
  </div>
</div> 