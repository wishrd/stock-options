import type { PageLoad } from './$types';
import { predictionsService } from '$lib/services/predictions';
import { stockOptionsService } from '$lib/services/stockOptions';
import type { Prediction, StockOptionPackage } from '$lib/models';

interface PageData {
  predictions: Prediction[];
  packages: StockOptionPackage[];
}

export const load = (async () => {
  const [predictions, packages] = await Promise.all([
    predictionsService.getPredictions(),
    stockOptionsService.getPackages()
  ]);

  return {
    predictions,
    packages
  };
}) satisfies PageLoad<PageData>; 