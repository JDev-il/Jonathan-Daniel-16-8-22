import { Component } from '@angular/core';
import { CurrencyService } from './core/services/currency.service';
import { ApiService } from './shared/services/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private apiService: ApiService,
    private currencyService: CurrencyService
  ) {
    this.currencyService.getCurrency();
  }
  title = 'Shopping Tracking List';
}
