export interface StockOptionPackage {
  id: string;
  amount: number;
  price: number;
  vestingDate: string;
  vestingStrategy: VestingStrategy;
}

export type VestingStrategy = 'linear' | 'cliff' | 'year'; 