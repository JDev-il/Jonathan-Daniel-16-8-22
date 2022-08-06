import { Injectable, InjectionToken, Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({ name: 'customCurrencyPipe' })
@Injectable({
  providedIn: 'root',
})
export class CustomCurrencyPipe implements PipeTransform {
  constructor(private customCurrency: CurrencyPipe) {}

  transform(value: string) {
    return this.customCurrency.transform(value, 'USD');
  }
}
