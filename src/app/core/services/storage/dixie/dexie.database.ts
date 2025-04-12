import { Injectable } from '@angular/core';

import Dexie, { Table } from 'dexie';

import { PackageData } from '../models/package-data';
import { PredictionData } from '../models/prediction-data';

@Injectable({ providedIn: 'root' })
export class DexieDatabase extends Dexie {
  packages!: Table<PackageData>;
  predictions!: Table<PredictionData>;

  constructor() {
    super('stockOptions');
    this.version(1).stores({
      packages: 'id',
      predictions: '++id'
    });
  }
}
