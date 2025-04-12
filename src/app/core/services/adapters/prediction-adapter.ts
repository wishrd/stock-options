import { Injectable } from '@angular/core';
import { Prediction, type PredictionProps } from '@core/models/prediction';
import { PredictionData } from '../storage/models/prediction-data';
import { OptionalId } from '@core/models/optional-id';

@Injectable({ providedIn: 'root' })
export class PredictionAdapter {

  toPrediction(data: PredictionData): Prediction {
    const id = data.id;
    if (!id) {
      throw new Error('Cannot create a Prediction without id');
    }

    return new Prediction({ ...data, id });
  }

  fromPrediction(prediction: OptionalId<PredictionProps>): PredictionData {
    return {
      id: prediction.id,
      price: prediction.price,
    };
  }
}
