import type { PageLoad } from './$types';
import { stockOptionsService } from '$lib/services/stockOptions';
import { predictionsService } from '$lib/services/predictions';

export const load: PageLoad = async ({ params }) => {
  const packages = await stockOptionsService.getPackages();
  const prediction = await predictionsService.getPrediction(params.id);

  return {
    packages,
    prediction
  };
}; 