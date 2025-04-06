import Dexie from 'dexie';
import type { StockOptionPackage, Prediction } from '$lib/types';
import type { StorageService } from './storage';

class StockOptionsDatabase extends Dexie {
  packages: Dexie.Table<StockOptionPackage, string>;
  predictions: Dexie.Table<Prediction, string>;

  constructor() {
    super('StockOptionsDatabase');
    
    this.version(1).stores({
      packages: 'id, vestingDate',
      predictions: 'id, price'
    });

    this.packages = this.table('packages');
    this.predictions = this.table('predictions');
  }
}

export class IndexedDBStorageService implements StorageService {
  private db: StockOptionsDatabase;

  constructor() {
    this.db = new StockOptionsDatabase();
  }

  async getPackages(): Promise<StockOptionPackage[]> {
    return this.db.packages.toArray();
  }

  async getPackage(id: string): Promise<StockOptionPackage | null> {
    const pkg = await this.db.packages.get(id);
    return pkg || null;
  }

  async savePackage(pkg: StockOptionPackage): Promise<void> {
    await this.db.packages.put(pkg);
  }

  async deletePackage(id: string): Promise<void> {
    await this.db.packages.delete(id);
  }

  async getPredictions(): Promise<Prediction[]> {
    return this.db.predictions.toArray();
  }

  async savePrediction(prediction: Prediction): Promise<void> {
    await this.db.predictions.put(prediction);
  }

  async deletePrediction(id: string): Promise<void> {
    await this.db.predictions.delete(id);
  }
} 