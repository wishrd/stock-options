import { Component } from '@angular/core';
import { injectData } from '@core/signals/inject-data';
import { PredictionCardComponent } from './components/prediction-card.component';
import { RouterLink } from '@angular/router';
import { Prediction } from '@core/models/prediction';
import { Package } from '@core/models/package';

@Component({
  selector: 'app-predictions',
  templateUrl: './predictions.component.html',
  standalone: true,
  imports: [RouterLink, PredictionCardComponent],
})
export class PredictionsComponent {
  predictions = injectData<Prediction[]>('predictions');
  packages = injectData<Package[]>('packages');
}
