import { Routes } from '@angular/router';
import { packagesResolver } from './features/packages/packages.resolver';
import { packageDetailResolver } from './features/package-detail/package-detail.resolver';
import { predictionsResolver } from './features/predictions/predictions.resolver';
import { predictionsPackagesResolver } from './features/predictions/predictions-packages.resolver';
import { predictionDetailResolver } from './features/prediction-detail/prediction-detail.resolver';

export const routes: Routes = [
  {
    path: 'packages',
    resolve: {
      packages: packagesResolver,
    },
    loadComponent: () => import('./features/packages/packages.component').then(c => c.PackagesComponent),
  },
  {
    path: 'packages/:id',
    resolve: {
      package: packageDetailResolver,
    },
    loadComponent: () => import('./features/package-detail/package-detail.component').then(c => c.PackageDetailComponent),
  },
  {
    path: 'predictions',
    resolve: {
      predictions: predictionsResolver,
      packages: predictionsPackagesResolver,
    },
    loadComponent: () => import('./features/predictions/predictions.component').then(c => c.PredictionsComponent),
  },
  {
    path: 'predictions/:id',
    resolve: {
      package: predictionDetailResolver,
    },
    loadComponent: () => import('./features/prediction-detail/prediction-detail.component').then(c => c.PredictionDetailComponent),
  },
  {
    path: '**',
    redirectTo: 'packages'
  }
];
