import type { StockOptionPackage, Prediction } from '$lib/types';
import { IndexedDBStorageService } from './indexedDB';

export interface StorageService {
  // Package operations
  getPackages(): Promise<StockOptionPackage[]>;
  getPackage(id: string): Promise<StockOptionPackage | null>;
  savePackage(pkg: StockOptionPackage): Promise<void>;
  deletePackage(id: string): Promise<void>;

  // Prediction operations
  getPredictions(): Promise<Prediction[]>;
  savePrediction(prediction: Prediction): Promise<void>;
  deletePrediction(id: string): Promise<void>;
}

// Factory function to get the storage service
export function getStorageService(): StorageService {
  return new IndexedDBStorageService();
} 