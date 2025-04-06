import type { Prediction, StockOptionPackage } from '$lib/types';
import { getStorageService } from './storage';
import { calculateVestedAmount } from '$lib/utils';

export class PredictionsService {
  private storage = getStorageService();

  async getPredictions(): Promise<Prediction[]> {
    return this.storage.getPredictions();
  }

  async createPrediction(price: number): Promise<Prediction> {
    const prediction: Prediction = {
      id: crypto.randomUUID(),
      price
    };

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

  calculateVestedRevenue(prediction: Prediction, packages: StockOptionPackage[]): number {
    let vestedRevenue = 0;

    for (const pkg of packages) {
      const vestedAmount = calculateVestedAmount(pkg);
      const vestedRevenueForPackage = vestedAmount * (prediction.price - pkg.price);
      vestedRevenue += vestedRevenueForPackage;
    }

    return vestedRevenue;
  }

  calculateTotalRevenue(prediction: Prediction, packages: StockOptionPackage[]): number {
    let totalRevenue = 0;

    for (const pkg of packages) {
      const totalRevenueForPackage = pkg.amount * (prediction.price - pkg.price);
      totalRevenue += totalRevenueForPackage;
    }

    return totalRevenue;
  }
}

// Singleton instance
export const predictionsService = new PredictionsService(); 