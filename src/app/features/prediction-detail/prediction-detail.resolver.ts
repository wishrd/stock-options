import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Prediction } from '@core/models/prediction';
import { PredictionDataService } from '@core/services/prediction.data-service';

export const predictionDetailResolver: ResolveFn<Prediction | null> = async ({ params }) => {
  const predictionId: string = params['id'];

  if (predictionId === 'new') {
    return null;
  }

  const prediction = await inject(PredictionDataService).get(predictionId);
  if (!prediction) {
    throw new Error('Prediction not found!');
  }

  return prediction;
};
