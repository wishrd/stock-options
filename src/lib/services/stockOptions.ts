import type { StockOptionPackage } from '$lib/models';
import { packagesStorage } from './storage/PackagesStorage';
import { calculateVestedAmount } from '$lib/utils';

export class StockOptionsService {
  async getPackages(): Promise<StockOptionPackage[]> {
    return packagesStorage.getPackages();
  }

  async getPackage(id: string): Promise<StockOptionPackage | null> {
    return packagesStorage.getPackage(id);
  }

  async createPackage(pkg: Omit<StockOptionPackage, 'id'>): Promise<StockOptionPackage> {
    const newPackage: StockOptionPackage = {
      ...pkg,
      id: crypto.randomUUID()
    };
    await packagesStorage.savePackage(newPackage);
    return newPackage;
  }

  async updatePackage(pkg: StockOptionPackage): Promise<void> {
    await packagesStorage.savePackage(pkg);
  }

  async deletePackage(id: string): Promise<void> {
    await packagesStorage.deletePackage(id);
  }

  async getVestedAmount(pkg: StockOptionPackage): Promise<number> {
    return calculateVestedAmount(pkg);
  }

  async getCurrentPrice(): Promise<number> {
    // TODO: Implement actual price fetching from an API
    return 0;
  }
}

// Singleton instance
export const stockOptionsService = new StockOptionsService(); 