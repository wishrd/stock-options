import { Package, PackageProps } from '@core/models/package';

import { PackageData } from '../storage/models/package-data';
import { Injectable } from '@angular/core';
import { OptionalId } from '@core/models/optional-id';

@Injectable({ providedIn: 'root' })
export class PackageAdapter {

  toPackage(data: PackageData): Package {
    const id = data.id;
    if (!id) {
      throw new Error('Cannot create a Package without id');
    }

    return new Package({ ...data, id });
  }

  fromPackage(pkg: OptionalId<PackageProps>): PackageData {
    return {
      id: pkg.id,
      amount: pkg.amount,
      price: pkg.price,
      vestingDate: pkg.vestingDate,
      vestingStrategy: pkg.vestingStrategy,
    };
  }
}
