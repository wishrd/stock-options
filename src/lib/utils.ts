import type { StockOptionPackage } from './types';

export function calculateVestedAmount(pkg: StockOptionPackage): number {
  const vestingDate = new Date(pkg.vestingDate);
  const now = new Date();
  
  if (now < vestingDate) {
    return 0;
  }

  const monthsSinceVesting = (now.getFullYear() - vestingDate.getFullYear()) * 12 + 
    (now.getMonth() - vestingDate.getMonth());

  let vestedAmount = 0;
  switch (pkg.vestingStrategy) {
    case 'linear':
      if (monthsSinceVesting >= 12) {
        const monthsAfterFirstYear = monthsSinceVesting - 12;
        const monthlyVest = pkg.amount * 0.75 / 48;
        vestedAmount = Math.min(pkg.amount, pkg.amount * 0.25 + monthlyVest * monthsAfterFirstYear);
      }
      break;
    
    case 'cliff':
      vestedAmount = monthsSinceVesting >= 6 ? pkg.amount : 0;
      break;
    
    case 'year':
      vestedAmount = monthsSinceVesting >= 12 ? pkg.amount : 0;
      break;
  }

  return vestedAmount;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
} 