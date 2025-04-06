import type { StockOptionPackage } from '$lib/models/StockOptionPackage';
import { db } from './StockOptionsDatabase';

export class PackagesStorage {
  async getPackages(): Promise<StockOptionPackage[]> {
    return db.packages.toArray();
  }

  async getPackage(id: string): Promise<StockOptionPackage | null> {
    const pkg = await db.packages.get(id);
    return pkg ?? null;
  }

  async savePackage(pkg: StockOptionPackage): Promise<void> {
    await db.packages.put(pkg);
  }

  async deletePackage(id: string): Promise<void> {
    await db.packages.delete(id);
  }
}

// Singleton instance
export const packagesStorage = new PackagesStorage(); 