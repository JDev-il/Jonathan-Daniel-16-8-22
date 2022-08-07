import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Item } from 'src/app/core/interfaces/Item.interface';
import {
  BehaviorSubject,
  map,
  mergeMap,
  Observable,
  Subject,
  take,
} from 'rxjs';

//Store Reducers
import * as fromRoot from '../../app.reducer';
//Store Actions
import * as UI from '../../store/actions/ui.actions';

/*
-- From Store:
--> to actions/reducers
--> then create a combined Reducers const (object + creating exporting createFeatureSelector etc.)
--> then spreading into services
--> then subscribing via components onInit() etc.
*/

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  items!: Item[];

  constructor(private http: HttpClient, private store: Store<fromRoot.State>) {}

  private readonly itemsSource = new BehaviorSubject(<Item[]>[]);
  private readonly currencySource = new Subject();

  readonly items$ = this.itemsSource.asObservable();
  readonly currency$ = this.currencySource.asObservable();

  private get _apiEndpoints() {
    return {
      productsEndpoint: `https://fakestoreapi.com/products`,
      currenciesEndpoint: `https://api.apilayer.com/exchangerates_data/convert?to=:to&from=:from&amount=:amount`,
    };
  }

  async getCurrencyApi(userAmount?: number) {
    if (userAmount) {
    }
    userAmount = userAmount || 1; // Temp value
    const path = this._apiEndpoints.currenciesEndpoint
      .replace(':to', String('ILS'))
      .replace(':from', String('USD'))
      .replace(':amount', String(userAmount));

    //?NEED TO SAVE ALL CREDENTIALS IN NGRX STORE

    this.http
      .get(path)
      .pipe(take(1), (data) => data)
      .subscribe((res) => {
        this.currencySource.next(res);
      });
  }

  async getItemsToPurchase() {
    this.store.dispatch(new UI.StartLoading());
    const path = this._apiEndpoints.productsEndpoint;
    return this.http
      .get(path)
      .pipe(map((data: any) => data))
      .subscribe(async (items) => {
        this.itemsSource.next(await items);
        this.store.dispatch(new UI.StopLoading());
      });
  }
}
