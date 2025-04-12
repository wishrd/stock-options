import { Component, inject } from '@angular/core';
import { injectData } from '@core/signals/inject-data';

import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PredictionDataService } from '@core/services/prediction.data-service';
import { Prediction } from '@core/models/prediction';

@Component({
  selector: 'app-prediction-detail',
  templateUrl: './prediction-detail.component.html',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
})
export class PredictionDetailComponent {
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly predictionDataService = inject(PredictionDataService);

  prediction = injectData<Prediction | null>('prediction');

  packageForm = this.formBuilder.group({
    price: new FormControl<number>(this.prediction()?.price || 0.00, [Validators.required, Validators.min(0)]),
  });

  async onSubmit(): Promise<void> {
    if (!this.packageForm.valid) {
      throw new Error('Prediction form is not valid');
    }

    await this.predictionDataService.save({
      id: this.prediction()?.id,
      price: this.packageForm.value.price!,
    });

    this.router.navigateByUrl('/predictions');
  }
}
