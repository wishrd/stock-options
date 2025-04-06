import type { Prediction } from '$lib/types';
import { getStorageService } from './storage';
import { stockOptionsService } from './stockOptions';
import { calculateVestedAmount } from '$lib/utils';

export class PredictionsService {
  private storage = getStorageService();

  async getPredictions(): Promise<Prediction[]> {
    return this.storage.getPredictions();
  }

  async createPrediction(price: number): Promise<Prediction> {
    const packages = await stockOptionsService.getPackages();
    const prediction: Prediction = {
      id: crypto.randomUUID(),
      price,
      totalRevenue: 0,
      vestedRevenue: 0,
      perPackage: {}
    };

    for (const pkg of packages) {
      const vestedAmount = calculateVestedAmount(pkg);
      const totalRevenue = pkg.amount * (price - pkg.price);
      const vestedRevenue = vestedAmount * (price - pkg.price);

      prediction.totalRevenue += totalRevenue;
      prediction.vestedRevenue += vestedRevenue;
      prediction.perPackage[pkg.id] = {
        totalRevenue,
        vestedRevenue
      };
    }

    await this.storage.savePrediction(prediction);
    return prediction;
  }

  async getPrediction(id: string): Promise<Prediction | null> {
    const predictions = await this.storage.getPredictions();
    return predictions.find(p => p.id === id) || null;
  }

  async deletePrediction(id: string): Promise<void> {
    await this.storage.deletePrediction(id);
  }
}

// Singleton instance
export const predictionsService = new PredictionsService(); 