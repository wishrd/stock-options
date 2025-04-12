import { PackageVestingStrategy } from '@core/models/package';

export const VESTING_STRATEGIES: { value: PackageVestingStrategy; label: string }[] = [
  { value: 'linear', label: 'Linear (1/4 after 1 year, then 1/48 monthly)' },
  { value: 'cliff', label: 'Cliff (100% after 6 months)' },
  { value: 'year', label: 'Year (100% after 12 months)' }
];
