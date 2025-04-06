export type VestingStrategy = 'quarterly' | 'six_months' | 'twelve_months';

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
  totalRevenue: number;
  vestedRevenue: number;
  perPackage: Record<string, {
    totalRevenue: number;
    vestedRevenue: number;
  }>;
} 