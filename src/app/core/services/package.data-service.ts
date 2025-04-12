import { Package, PackageProps } from '@core/models/package';
import type { DataService } from './data-service';
import { inject, Injectable } from '@angular/core';
import { DexieDatabase } from './storage/dixie/dexie.database';
import { PackageAdapter } from './adapters/package-adapter';
import { OptionalId } from '@core/models/optional-id';

@Injectable({ providedIn: 'root' })
export class PackageDataService implements DataService<Package> {

  private readonly packagesDb = inject(DexieDatabase).packages;
  private readonly adapter = inject(PackageAdapter);

  async all(): Promise<Package[]> {
    return (await this.packagesDb.toArray()).map(data => this.adapter.toPackage(data));
  }

  async get(id: string): Promise<Package | null> {
    const pkg = await this.packagesDb.get(id);
    return pkg ? this.adapter.toPackage(pkg) : null;
  }

  async save(pkg: OptionalId<PackageProps>): Promise<void> {
    return this.packagesDb.put(this.adapter.fromPackage(pkg));
  }

  async delete(id: string): Promise<void> {
    return this.packagesDb.delete(id);
  }
}
