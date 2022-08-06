import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Item } from 'src/app/core/interfaces/Item.interface';
import { BehaviorSubject, map, mergeMap, Observable, Subject } from 'rxjs';

import { ApiEnum } from '../../shared/enums/api.enum';

import * as appReducer from '../../app.reducer'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  //TODO: ~~ Eventuallym everything need to move from here to --> NGRX side effects!!! ~~

  items!: Item[];

  constructor(private http: HttpClient, private store: Store<{ui: appReducer.State}>) {}

  private readonly itemsSource = new BehaviorSubject(<Item[]>[]);
  private readonly currencySource = new Subject();

  readonly items$ = this.itemsSource.asObservable();
  readonly currency$ = this.currencySource.asObservable();

  private get ApiRoutes() {
    return {
      getProducts: ApiEnum.PRODUCTS_PATH,
      getCurrencies:
        ApiEnum.EXCHANGE_PATH + '/convert?to=:to&from=:from&amount=:amount',
    };
  }

  async getCurrencyApi(userAmount?: number) {
    userAmount = 1; // Temp value
    const path = this.ApiRoutes.getCurrencies
      .replace(':to', String('ILS'))
      .replace(':from', String('USD'))
      .replace(':amount', String(userAmount));
    let headers = new HttpHeaders();
    let headersReady = headers.set('apiKey', ApiEnum.APIKEY);
    //NEED TO SAVE ALL CREDENTIALS IN NGRX STORE
    this.http
      .get(path, { headers: headersReady })
      .pipe((data: any) => data)
      .subscribe((res) => {
        this.currencySource.next(res);
      });
  }

  async getItemsToPurchase() {
    //->Change Later
    this.store.dispatch({type: 'START_LOADING'})
    const path = this.ApiRoutes.getProducts;
    return this.http
      .get(path)
      .pipe(map((data: any) => data))
      .subscribe(async (items) => {
        this.itemsSource.next(await items);

        //->Change Later
        this.store.dispatch({type: 'STOP_LOADING'})
      });
  }
}
