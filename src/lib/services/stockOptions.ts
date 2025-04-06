import type { StockOptionPackage } from '$lib/types';
import { getStorageService } from './storage';
import { calculateVestedAmount } from '$lib/utils';

export class StockOptionsService {
  private storage = getStorageService();

  async getPackages(): Promise<StockOptionPackage[]> {
    return this.storage.getPackages();
  }

  async getPackage(id: string): Promise<StockOptionPackage | null> {
    return this.storage.getPackage(id);
  }

  async createPackage(pkg: Omit<StockOptionPackage, 'id'>): Promise<StockOptionPackage> {
    const newPackage: StockOptionPackage = {
      ...pkg,
      id: crypto.randomUUID()
    };
    await this.storage.savePackage(newPackage);
    return newPackage;
  }

  async updatePackage(pkg: StockOptionPackage): Promise<void> {
    await this.storage.savePackage(pkg);
  }

  async deletePackage(id: string): Promise<void> {
    await this.storage.deletePackage(id);
  }

  async getVestedAmount(pkg: StockOptionPackage): Promise<number> {
    return calculateVestedAmount(pkg);
  }
}

// Singleton instance
export const stockOptionsService = new StockOptionsService(); 