import type { Prediction } from '$lib/models';
import { predictionsStorage } from './storage/PredictionsStorage';

export class PredictionsService {
  async getPredictions(): Promise<Prediction[]> {
    return predictionsStorage.getPredictions();
  }

  async createPrediction(prediction: Omit<Prediction, 'id'>): Promise<Prediction> {
    const newPrediction: Prediction = {
      id: crypto.randomUUID(),
      ...prediction
    };

    await predictionsStorage.savePrediction(newPrediction);
    return newPrediction;
  }

  async getPrediction(id: string): Promise<Prediction | null> {
    return predictionsStorage.getPrediction(id);
  }

  async deletePrediction(id: string): Promise<void> {
    await predictionsStorage.deletePrediction(id);
  }
}

// Singleton instance
export const predictionsService = new PredictionsService(); 