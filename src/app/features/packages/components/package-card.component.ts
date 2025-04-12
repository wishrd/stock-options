import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { Package } from '@core/models/package';

@Component({
  selector: 'app-package-card',
  templateUrl: './package-card.component.html',
  standalone: true,
  imports: [RouterLink, DatePipe, CurrencyPipe],
})
export class PackageCardComponent {
  package = input.required<Package>();
}
