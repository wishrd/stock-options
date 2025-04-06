<script lang="ts">
  import PackageForm from '$lib/components/PackageForm.svelte';
  import { stockOptionsService } from '$lib/services/stockOptions';
  import { goto } from '$app/navigation';
  import type { StockOptionPackage } from '$lib/models';

  const id = 'package-form';

  async function handleSubmit(stockPackage: StockOptionPackage) {
    await stockOptionsService.createPackage(stockPackage);
    goto('#/');
  }
</script>

<div class="flex flex-col h-full">
  <div class="sticky top-0 z-10 bg-base-200">
    <h1 class="text-2xl font-bold">New package</h1>
  </div>

  <div class="flex-1 overflow-y-auto py-6 pb-24">
    <PackageForm id={id} onSubmit={handleSubmit} />
  </div>

  <div class="fixed bottom-0 left-0 right-0 bg-base-100 border-t border-base-300 py-4 px-4">
    <div class="flex justify-end gap-4">
      <a href="#/" class="btn btn-ghost">Cancel</a>
      <button 
        type="submit" 
        form={id} 
        class="btn btn-primary"
      >
        Create
      </button>
    </div>
  </div>
</div> 