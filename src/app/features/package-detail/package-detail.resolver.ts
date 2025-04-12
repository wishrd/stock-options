import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Package } from '@core/models/package';
import { PackageDataService } from '@core/services/package.data-service';

export const packageDetailResolver: ResolveFn<Package | null> = async ({ params }) => {
  const packageId: string = params['id'];

  if (packageId === 'new') {
    return null;
  }

  const pkg = await inject(PackageDataService).get(packageId);
  if (!pkg) {
    throw new Error('Package not found!');
  }

  return pkg;
};
