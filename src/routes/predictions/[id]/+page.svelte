<script lang="ts">
  import type { Prediction, StockOptionPackage } from '$lib/types';
  import { formatCurrency } from '$lib/utils';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  let packages: StockOptionPackage[] = data.packages;
  let prediction: Prediction | null = data.prediction;
</script>

<div class="max-w-4xl mx-auto space-y-4">
  <div class="flex justify-between items-center">
    <h1 class="text-2xl font-bold">Prediction Details</h1>
    <button class="btn btn-ghost" on:click={() => window.history.back()}>Back</button>
  </div>

  {#if prediction}
    <div class="stats shadow">
      <div class="stat">
        <div class="stat-title">Price</div>
        <div class="stat-value">{formatCurrency(prediction.price)}</div>
      </div>
      <div class="stat">
        <div class="stat-title">Total Revenue</div>
        <div class="stat-value">{formatCurrency(prediction.totalRevenue)}</div>
      </div>
      <div class="stat">
        <div class="stat-title">Vested Revenue</div>
        <div class="stat-value">{formatCurrency(prediction.vestedRevenue)}</div>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th>Package ID</th>
            <th>Total Revenue</th>
            <th>Vested Revenue</th>
          </tr>
        </thead>
        <tbody>
          {#each packages as pkg}
            <tr>
              <td>{pkg.id}</td>
              <td>{formatCurrency(prediction.perPackage[pkg.id].totalRevenue)}</td>
              <td>{formatCurrency(prediction.perPackage[pkg.id].vestedRevenue)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {:else}
    <div class="alert alert-error">
      <span>Prediction not found</span>
    </div>
  {/if}
</div> 