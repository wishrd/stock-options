import { Component } from '@angular/core';
import { Package } from '@core/models/package';
import { injectData } from '@core/signals/inject-data';
import { PackageCardComponent } from './components/package-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  standalone: true,
  imports: [RouterLink, PackageCardComponent],
})
export class PackagesComponent {
  packages = injectData<Package[]>('packages');
}
