import { Component, inject } from '@angular/core';
import { injectData } from '@core/signals/inject-data';

import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Package, PackageVestingStrategy } from '@core/models/package';
import { Router, RouterLink } from '@angular/router';
import { VESTING_STRATEGIES } from './utils/vesting-strategies';
import { PackageDataService } from '@core/services/package.data-service';

@Component({
  selector: 'app-package-detail',
  templateUrl: './package-detail.component.html',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
})
export class PackageDetailComponent {
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly packageDataService = inject(PackageDataService);

  package = injectData<Package | null>('package');
  vestingStrategies = VESTING_STRATEGIES;

  packageForm = this.formBuilder.group({
    id: new FormControl<string>({ value: this.package()?.id || '', disabled: !!this.package()?.id }, [Validators.required]),
    amount: new FormControl<number>(this.package()?.amount || 0, [Validators.required, Validators.min(1)]),
    price: new FormControl<number>(this.package()?.price || 0.00, [Validators.required, Validators.min(0)]),
    vestingDate: new FormControl<string>(this.package()?.vestingDate || '', [Validators.required]),
    vestingStrategy: new FormControl<PackageVestingStrategy>(this.package()?.vestingStrategy || 'linear', [Validators.required]),
  });

  async onSubmit(): Promise<void> {
    if (!this.packageForm.valid) {
      throw new Error('Package form is not valid');
    }

    await this.packageDataService.save({
      id: this.packageForm.value.id || this.package()?.id,
      amount: this.packageForm.value.amount!,
      price: this.packageForm.value.price!,
      vestingDate: this.packageForm.value.vestingDate!,
      vestingStrategy: this.packageForm.value.vestingStrategy!,
    });

    this.router.navigateByUrl('/packages');
  }
}
