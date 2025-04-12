export type PackageDataVestingStrategy = 'linear' | 'cliff' | 'year';

export interface PackageData {
  id?: string;
  amount: number;
  price: number;
  vestingDate: string;
  vestingStrategy: PackageDataVestingStrategy;
}

