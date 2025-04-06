import type { Prediction } from '$lib/models/Prediction';
import { db } from './StockOptionsDatabase';

export class PredictionsStorage {
  async getPredictions(): Promise<Prediction[]> {
    return db.predictions.toArray();
  }

  async getPrediction(id: string): Promise<Prediction | null> {
    const prediction = await db.predictions.get(id);
    return prediction ?? null;
  }

  async savePrediction(prediction: Prediction): Promise<void> {
    await db.predictions.put(prediction);
  }

  async deletePrediction(id: string): Promise<void> {
    await db.predictions.delete(id);
  }
}

// Singleton instance
export const predictionsStorage = new PredictionsStorage(); 