import { Pipe, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrencyService } from '../services/currency.service';

@Pipe({ name: 'exchangeCurrency' })
export class ExchangeCurrencyPipe implements PipeTransform {
  currencySubcribe!: Subscription;

  constructor(private currencyService: CurrencyService) {}

  transform(userInput: number, symbol?: string) {

    let updatedCurrency = this.currencyService.updatedCurrency?.result || 3.270299;
    if (symbol === "$") {
      return (userInput / updatedCurrency).toFixed(2)
    }
    return userInput.toFixed(2)
  }
}
