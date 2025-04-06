<script lang="ts">
  import PackageForm from '$lib/components/PackageForm.svelte';
  import { stockOptionsService } from '$lib/services/stockOptions';
  import { goto } from '$app/navigation';
  import type { StockOptionPackage } from '$lib/models';

  async function handleSubmit(stockPackage: StockOptionPackage) {
    await stockOptionsService.createPackage(stockPackage);
    goto('/');
  }
</script>

<div class="space-y-6">
  <h1 class="text-2xl font-bold">New Stock Options Package</h1>
  <PackageForm onSubmit={handleSubmit} />
</div> 