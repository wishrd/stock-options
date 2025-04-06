export type VestingStrategy = 'linear' | 'cliff' | 'year';

export interface StockOptionPackage {
  id: string;
  amount: number;
  price: number;
  vestingDate: string;
  vestingStrategy: VestingStrategy;
}

export interface VestedAmount {
  total: number;
  vested: number;
}

export interface Prediction {
  id: string;
  price: number;
} 