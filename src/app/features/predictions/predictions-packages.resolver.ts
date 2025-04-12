import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Package } from '@core/models/package';
import { PackageDataService } from '@core/services/package.data-service';

export const predictionsPackagesResolver: ResolveFn<Package[]> = async () => {
  return inject(PackageDataService).all();
};
