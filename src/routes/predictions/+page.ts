import type { PageLoad } from './$types';
import { predictionsService } from '$lib/services/predictions';
import { stockOptionsService } from '$lib/services/stockOptions';

export const load: PageLoad = async () => {
  const [predictions, packages] = await Promise.all([
    predictionsService.getPredictions(),
    stockOptionsService.getPackages()
  ]);

  return {
    predictions,
    packages
  };
}; 