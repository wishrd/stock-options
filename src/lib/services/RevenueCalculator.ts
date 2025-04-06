import type { Prediction, StockOptionPackage } from '$lib/models';
import { calculateVestedAmount } from '$lib/utils';

export class RevenueCalculator {
  calculateVestedRevenue(prediction: Prediction, packages: StockOptionPackage[]): number {
    return packages.reduce((total, pkg) => 
      total + this.calculatePackageVestedRevenue(pkg, prediction.price), 0);
  }

  calculateTotalRevenue(prediction: Prediction, packages: StockOptionPackage[]): number {
    return packages.reduce((total, pkg) => 
      total + this.calculatePackageRevenue(pkg, prediction.price), 0);
  }

  calculatePackageRevenue(pkg: StockOptionPackage, price: number): number {
    return pkg.amount * (price - pkg.price);
  }

  calculatePackageVestedRevenue(pkg: StockOptionPackage, price: number): number {
    const vestedAmount = calculateVestedAmount(pkg);
    return vestedAmount * (price - pkg.price);
  }
}