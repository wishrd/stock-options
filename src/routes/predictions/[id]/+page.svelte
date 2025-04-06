<script lang="ts">
  import type { Prediction, StockOptionPackage } from '$lib/models';
  import { formatCurrency } from '$lib/utils';
  import { predictionsService } from '$lib/services/predictions';
  import { RevenueCalculator } from '$lib/services/RevenueCalculator';
  import { goto } from '$app/navigation';
  import type { PageProps } from './$types';

  const revenueCalculator = new RevenueCalculator();
  let { data }: PageProps = $props();
  let packages: StockOptionPackage[] = data.packages;
  let prediction: Prediction | null = data.prediction;

  function getPackageRevenue(pkg: StockOptionPackage): string {
    if (!prediction) return formatCurrency(0);
    const totalRevenue = revenueCalculator.calculatePackageRevenue(pkg, prediction.price);
    return formatCurrency(totalRevenue);
  }

  function getPackageVestedRevenue(pkg: StockOptionPackage): string {
    if (!prediction) return formatCurrency(0);
    const vestedRevenue = revenueCalculator.calculatePackageVestedRevenue(pkg, prediction.price);
    return formatCurrency(vestedRevenue);
  }

  async function deletePrediction() {
    if (!prediction) return;
    
    if (confirm('Are you sure you want to delete this prediction?')) {
      await predictionsService.deletePrediction(prediction.id);
      goto('/predictions');
    }
  }
</script>

<div class="space-y-4">
  {#if !prediction}
    <div class="alert alert-error">
      <span>Prediction not found</span>
    </div>
  {:else}
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Prediction Details</h1>
      <button class="btn btn-error" on:click={deletePrediction}>Delete</button>
    </div>

    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Price: {formatCurrency(prediction.price)}</h2>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-sm text-gray-500">Total Revenue</p>
            <p class="font-semibold">{formatCurrency(revenueCalculator.calculateTotalRevenue(prediction, packages))}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Vested Revenue</p>
            <p class="font-semibold">{formatCurrency(revenueCalculator.calculateVestedRevenue(prediction, packages))}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-bold">Revenue by Package</h2>
      {#each packages as pkg}
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h3 class="card-title">Package {pkg.id}</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-500">Total Revenue</p>
                <p class="font-semibold">{getPackageRevenue(pkg)}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Vested Revenue</p>
                <p class="font-semibold">{getPackageVestedRevenue(pkg)}</p>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div> 