import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import * as fromRoot from '../../../app.reducer';

@Component({
  selector: 'app-purchases-by-items',
  templateUrl: './purchases-by-items.component.html',
  styleUrls: ['./purchases-by-items.component.scss'],
})
export class PurchasesByItemsComponent implements OnInit {
  tableColumns = ['id', 'title', 'store', 'price', 'delivery', 'action'];
  tablesOnlineStores!: string[];
  currencyConvertor!: string;
  currencySymbolTransfer!: string;
  isLoading$!: Observable<any>;

  constructor(
    private apiService: ApiService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.tablesOnlineStores = this.apiService.tablesOnlineStores;
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }

  currentCurrencyReciever(value: string) {
    this.currencyConvertor = value;
  }
}
