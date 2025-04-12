import { Injectable } from '@angular/core';
import { Package } from '@core/models/package';
import { Prediction } from '@core/models/prediction';

@Injectable({ providedIn: 'root' })
export class PredictionCalculator {

  calculateVestedRevenue(prediction: Prediction, packages: Package[]): number {
    return packages.reduce((total, pkg) =>
      total + this.calculatePackageVestedRevenue(pkg, prediction.price), 0);
  }

  calculateTotalRevenue(prediction: Prediction, packages: Package[]): number {
    return packages.reduce((total, pkg) =>
      total + this.calculatePackageRevenue(pkg, prediction.price), 0);
  }

  calculatePackageRevenue(pkg: Package, price: number): number {
    return pkg.amount * (price - pkg.price);
  }

  calculatePackageVestedRevenue(pkg: Package, price: number): number {
    return pkg.vestedAmount * (price - pkg.price);
  }
}
