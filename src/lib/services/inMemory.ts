import type { StockOptionPackage, Prediction } from '$lib/types';
import type { StorageService } from './storage';

export class InMemoryStorageService implements StorageService {
  private packages: StockOptionPackage[] = [];
  private predictions: Prediction[] = [];

  async getPackages(): Promise<StockOptionPackage[]> {
    return this.packages;
  }

  async getPackage(id: string): Promise<StockOptionPackage | null> {
    return this.packages.find(pkg => pkg.id === id) || null;
  }

  async savePackage(pkg: StockOptionPackage): Promise<void> {
    const index = this.packages.findIndex(p => p.id === pkg.id);
    if (index >= 0) {
      this.packages[index] = pkg;
    } else {
      this.packages.push(pkg);
    }
  }

  async deletePackage(id: string): Promise<void> {
    this.packages = this.packages.filter(pkg => pkg.id !== id);
  }

  async getPredictions(): Promise<Prediction[]> {
    return this.predictions;
  }

  async savePrediction(prediction: Prediction): Promise<void> {
    const index = this.predictions.findIndex(p => p.id === prediction.id);
    if (index >= 0) {
      this.predictions[index] = prediction;
    } else {
      this.predictions.push(prediction);
    }
  }

  async deletePrediction(id: string): Promise<void> {
    this.predictions = this.predictions.filter(p => p.id !== id);
  }
} 