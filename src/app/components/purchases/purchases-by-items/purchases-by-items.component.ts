import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { UiService } from 'src/app/shared/services/ui.service';
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
  isLoading$!: any;

  constructor(
    private apiService: ApiService,
    private uiService: UiService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.tablesOnlineStores = this.apiService.tablesOnlineStores;
    this.isLoading$ = this.uiService.loadingState;
  }

  currentCurrencyReciever(value: string) {
    this.currencyConvertor = value;
  }
}
