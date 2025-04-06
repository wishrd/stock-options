import Dexie from 'dexie';
import type { Table } from 'dexie';
import type { StockOptionPackage } from '$lib/models/StockOptionPackage';
import type { Prediction } from '$lib/models/Prediction';

export class StockOptionsDatabase extends Dexie {
  packages!: Table<StockOptionPackage>;
  predictions!: Table<Prediction>;

  constructor() {
    super('stockOptions');
    this.version(1).stores({
      packages: 'id',
      predictions: 'id'
    });
  }
}

// Singleton instance of the database
export const db = new StockOptionsDatabase(); 