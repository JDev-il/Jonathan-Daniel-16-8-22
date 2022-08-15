import { Pipe, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrencyService } from '../services/currency.service';

@Pipe({ name: 'exchangeCurrency' })
export class ExchangeCurrencyPipe implements PipeTransform {
  currencySubcribe!: Subscription;

  constructor(private currencyService: CurrencyService) {}

  transform(userInput: number, symbol: string) {

    let inDollars = userInput / this.currencyService.updatedCurrency?.result;

    if (symbol === '$') {
      return inDollars.toFixed(2);
    }
    return userInput.toFixed(2);
  }
}
