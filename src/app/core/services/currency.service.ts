import { Injectable, OnDestroy } from '@angular/core';
import { timer, Subscription, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { CurrencyItem } from '../interfaces/Currency.interface';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class CurrencyService implements OnDestroy {
  subscription!: Subscription;
  updatedCurrency!: CurrencyItem | any;
  selectedCurrency!: string;

  private get _currency() {
    return {
      currenciesEndpoint: `https://api.apilayer.com/exchangerates_data/convert?to=:to&from=:from&amount=:amount`,
    };
  }

  constructor(private http: HttpClient) {}

  get getSelectedCurrency() {
    return this.selectedCurrency;
  }


  /**
  * - Hello!
  * -   Please make sure to change the ApiLayer.com apiKey,
  * -   located in the interceptor.service.ts file
  */
  getCurrency() {
    const path = this._currency.currenciesEndpoint
      .replace(':to', String('ILS'))
      .replace(':from', String('USD'))
      .replace(':amount', String(1));
    this.subscription = timer(0, 10000)
      .pipe(switchMap(() => this.http.get(path)))
      .subscribe((result: CurrencyItem | any) => {
        this.updatedCurrency = result;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
