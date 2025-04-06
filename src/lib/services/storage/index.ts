import { PackagesStorage } from './PackagesStorage';
import { PredictionsStorage } from './PredictionsStorage';

let packagesStorage: PackagesStorage | null = null;
let predictionsStorage: PredictionsStorage | null = null;

export function getPackagesStorage(): PackagesStorage {
  if (!packagesStorage) {
    packagesStorage = new PackagesStorage();
  }
  return packagesStorage;
}

export function getPredictionsStorage(): PredictionsStorage {
  if (!predictionsStorage) {
    predictionsStorage = new PredictionsStorage();
  }
  return predictionsStorage;
} 