import { Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Package } from '@core/models/package';
import { Prediction } from '@core/models/prediction';
import { PredictionCalculator } from './prediction-calculator';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-prediction-card',
  templateUrl: './prediction-card.component.html',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
})
export class PredictionCardComponent {
  private readonly predictionCalculator = inject(PredictionCalculator);

  prediction = input.required<Prediction>();
  packages = input.required<Package[]>();

  detailedPrediction = computed(() => {
    const total = this.predictionCalculator.calculateTotalRevenue(this.prediction(), this.packages());
    const vested = this.predictionCalculator.calculateVestedRevenue(this.prediction(), this.packages());

    return {
      value: this.prediction(),
      total,
      vested,
      packages: this.packages().map((pkg => ({
        value: pkg,
        total: this.predictionCalculator.calculatePackageRevenue(pkg, this.prediction().price),
        vested: this.predictionCalculator.calculatePackageVestedRevenue(pkg, this.prediction().price),
      }))),
    };
  });

  isExpanded = signal(false);

  toggleExpand(): void {
    this.isExpanded.set(!this.isExpanded());
  }
}
