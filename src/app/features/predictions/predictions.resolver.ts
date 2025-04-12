import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Prediction } from '@core/models/prediction';
import { PredictionDataService } from '@core/services/prediction.data-service';

export const predictionsResolver: ResolveFn<Prediction[]> = async () => {
  return inject(PredictionDataService).all();
};
